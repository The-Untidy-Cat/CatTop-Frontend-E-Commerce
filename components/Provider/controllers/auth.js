import { api } from "@/utils/axios";
import { notification } from "antd";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export const useAuthController = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(false);
  const [loadingUser, setLoadingUser] = useState(true);

  const login = async (account) => {
    setLoadingAuth(true);
    try {
      const response = await api.post(`/auth/customer`, account);
      setLoadingAuth(false);
      const { data } = response;
      if (data?.code == 200) {
        setUser(data?.data?.user);
        notification.success({
          message: "Thành công",
          description: data?.message || "Đăng nhập thành công",
        });
        router.push("/");
      }
    } catch (error) {
      setLoadingAuth(false);
      notification.error({
        message: "Lỗi",
        description: error?.response?.data?.message || "Có lỗi xảy ra",
      });
      throw error?.reponses?.data?.errors || error?.message || "Có lỗi xảy ra";
    }
    setLoadingAuth(false);
  };
  const register = async (account) => {
    setLoadingAuth(true);
    try {
      const response = await api.post(`/auth/register`, account);
      setLoadingAuth(false);
      const { data } = response;
      if (data?.code == 200) {
        notification.success({
          message: "Thành công",
          description: data?.message || "Đăng ký thành công",
        });
        router.push("/login");
      }
    } catch (error) {
      setLoadingAuth(false);
      notification.error({
        message: "Lỗi",
        description: error?.response?.data?.message || "Có lỗi xảy ra",
      });
      throw error?.reponses?.data?.errors || error?.message || "Có lỗi xảy ra";
    }
    setLoadingAuth(false);
  };

  const logout = async () => {
    setLoadingAuth(true);
    try {
      setLoadingAuth(true);
      api
        .delete(`/auth/logout`)
        .then(() => {
          setUser(null);
        })
        .catch((e) => {
          notification.error({
            message: "Lỗi",
            description: e?.response?.data?.message || "Có lỗi xảy ra",
          })
        })
        .finally(() => {
          setLoadingAuth(false);
        });
    } catch (error) {
      notification.error({
        message: "Error",
        description: error?.message || "Something went wrong",
      });
    }
    setLoadingAuth(false);
  };

  const forgotPassword = async (email) => {
    try {
      const response = await api.post(`/auth/forgot-password`, {
        email,
      });
      return response.data;
    } catch (e) {
      throw (
        e?.response?.data?.errors ||
        e?.response?.data?.message ||
        "Lỗi không xác định. Vui lòng thử lại sau"
      );
    }
  };

  const verifyOTP = async (email, code) => {
    try {
      const response = await api.post(`/auth/verify-otp`, {
        email,
        token: String(code).replaceAll(/\s/g, "").replaceAll(",", "").trim(),
      });
      return response.data;
    } catch (e) {
      throw (
        e?.response?.data?.errors ||
        e?.response?.data?.message ||
        "Lỗi không xác định. Vui lòng thử lại sau"
      );
    }
  };

  const resetPassword = async (email, code, password) => {
    try {
      const response = await api.post(`/auth/reset-password`, {
        email,
        token: String(code).replaceAll(/\s/g, "").replaceAll(",", "").trim(),
        password,
      });
      return response.data;
    } catch (e) {
      throw (
        e?.response?.data?.errors ||
        e?.response?.data?.message ||
        "Lỗi không xác định. Vui lòng thử lại sau"
      );
    }
  };

  const getUser = async () => {
    setLoadingUser(true);
    try {
      const response = await api.get(`/customer/user`);
      setLoadingUser(false);
      const { data } = response;
      if (data?.code == 200) {
        setUser(data?.data?.user);
      }
    } catch (error) {
      setLoadingUser(false);
      setUser(null);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return {
    user,
    loadingAuth,
    loadingUser,
    register,
    login,
    logout,
    forgotPassword,
    verifyOTP,
    resetPassword,
  };
};

export const useFakeAuthController = () => {
  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(false);

  const login = async (account) => {
    setLoadingAuth(true);
    try {
      if (account.username !== "admin" || account.password !== "admin") {
        throw new Error("Invalid credentials");
      }
      setUser({
        name: "Administrator",
        role: "admin",
      });
      notification.success({
        message: "Success",
        description: "Login successfully",
      });
    } catch (error) {
      notification.error({
        message: "Error",
        description: error?.message || "Something went wrong",
        duration: 30000,
      });
    }
    setLoadingAuth(false);
  };

  const logout = async () => {
    setLoadingAuth(true);
    try {
      // Logout logic here
      setUser(null);
      notification.success({
        message: "Success",
        description: "Logout successfully",
      });
    } catch (error) {
      notification.error({
        message: "Error",
        description: error?.message || "Something went wrong",
      });
    }
    setLoadingAuth(false);
  };

  return {
    user,
    loadingAuth,
    login,
    logout,
  };
};
