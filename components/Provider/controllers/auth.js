import { api } from "@/utils/axios";
import { notification } from "antd";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export const useUserController = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(false);
  const [loadingUser, setLoadingUser] = useState(true);
  const [loadingCart, setLoadingCart] = useState(false);
  // const cartSelector = useSelector((state) => state.cart);
  const [cart, setCart] = useState([]);

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
        if (router?.query?.redirect) {
          router.push(
            { pathname: router?.query?.redirect, query: {} },
            undefined,
            { shallow: true }
          );
        } else router.push("/");
      }
    } catch (error) {
      setLoadingAuth(false);
      // notification.error({
      //   message: "Lỗi",
      //   description: error?.response?.data?.message || "Có lỗi xảy ra",
      // });
      throw error?.response?.data?.errors || error?.response?.data?.message || error?.message || "Có lỗi xảy ra";
    }
    setLoadingAuth(false);
  };

  const quickLogin = async (account) => {
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
      }
    } catch (error) {
      setLoadingAuth(false);
      notification.error({
        message: "Lỗi",
        description: error?.response?.data?.message || "Có lỗi xảy ra",
      });
      throw error?.response?.data?.errors || error?.message || "Có lỗi xảy ra";
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
        await login({ username: account.username, password: account.password });
      }
    } catch (error) {
      setLoadingAuth(false);
      throw error?.response?.data?.errors || error?.message || "Có lỗi xảy ra";
    }
    setLoadingAuth(false);
  };

  const updateProfile = async (account) => {
    setLoadingAuth(true);
    try {
      const response = await api.put(`/customer/user`, account);
      setLoadingAuth(false);
      setUser(response?.data?.data?.user);
      return;
    } catch (error) {
      setLoadingAuth(false);
      throw error?.response?.data?.errors || error?.message || "Có lỗi xảy ra";
    }
  };

  const changePassword = async (account) => {
    setLoadingAuth(true);
    try {
      const response = await api.post(
        `/customer/user/change-password`,
        account
      );
      setLoadingAuth(false);
      setUser(response?.data?.data?.user);
      return;
    } catch (error) {
      setLoadingAuth(false);
      throw error?.response?.data?.errors || error?.message || "Có lỗi xảy ra";
    }
  };
  const logout = async () => {
    setLoadingAuth(true);
    try {
      setLoadingAuth(true);
      api
        .delete(`/auth/logout`)
        .then(() => {
          setUser(null);
          router.reload();
        })
        .catch((e) => {
          notification.error({
            message: "Lỗi",
            description: e?.response?.data?.message || "Có lỗi xảy ra",
          });
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
      const { data } = response;
      if (data?.code == 200) {
        notification.success({
          message: "Thành công",
          description: data?.message || "Đổi mật khẩu thành công",
        });
        router.push({
          pathname: "/login",
          query: { ...router.query },
        });
      }
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
    setLoadingCart(true);
    try {
      const response = await api.get(`/customer/user`);
      setLoadingUser(false);
      setLoadingCart(false);
      const { data } = response;
      if (data?.code == 200) {
        setUser(data?.data?.user);
        setCart(data?.data?.cart);
      }
    } catch (error) {
      setLoadingUser(false);
      setLoadingCart(false);
      setUser(null);
    }
  };

  const addItemToCart = async (item) => {
    setLoadingCart(true);
    try {
      const response = await api.post(`/customer/cart`, {
        variant_id: item.variant_id,
        amount: item.amount,
      });
      setCart(response?.data?.data?.cart);
    } catch (error) {
      notification.error({
        message: "Lỗi",
        description: error?.response?.data?.message || "Có lỗi xảy ra",
      });
    }
    setLoadingCart(false);
    return;
  };

  const decreaseItemFromCart = async (item) => {
    if (item.amount <= 1) {
      return;
    }
    setLoadingCart(true);
    try {
      const response = await api.put(`/customer/cart/${item.id}`, {
        amount: item.amount - 1,
      });
      setCart(response?.data?.data?.cart);
    } catch (error) {
      notification.error({
        message: "Lỗi",
        description: "Không thể cập nhật số lượng",
      });
    }
    setLoadingCart(false);
    return;
  };

  const incresaseItemFromCart = async (item) => {
    if (item.amount >= 10) {
      return;
    }
    setLoadingCart(true);
    try {
      const response = await api.put(`/customer/cart/${item.id}`, {
        amount: item.amount + 1,
      });
      setCart(response?.data?.data?.cart);
    } catch (error) {
      notification.error({
        message: "Lỗi",
        description: "Không thể cập nhật số lượng",
      });
    }
    setLoadingCart(false);
    return;
  };

  const removeItemFromCart = async (item) => {
    setLoadingCart(true);
    try {
      const response = await api.put(`/customer/cart/${item.id}`, {
        amount: 0,
      });
      setCart(response?.data?.data?.cart);
    } catch (error) {
      notification.error({
        message: "Lỗi",
        description: "Không thể xoá sản phẩm",
      });
    }
    setLoadingCart(false);
    return;
  };

  const updateItemFromCart = async (item, value) => {
    setLoadingCart(true);
    try {
      const response = await api.put(`/customer/cart/${item.id}`, {
        amount: value,
      });
      setCart(response?.data?.data?.cart);
    } catch (error) {
      notification.error({
        message: "Lỗi",
        description: "Không thể cập nhật số lượng",
      });
    }
    setLoadingCart(false);
    return;
  };

  const clearCart = async () => {
    try {
      await api.delete(`/customer/cart`);
      setCart([]);
    } catch (error) {
      notification.error({
        message: "Lỗi",
        description: "Không thể xoá giỏ hàng",
      });
    }
    return;
  };

  const refreshCart = async () => {
    try {
      const response = await api.get(`/customer/cart`);
      setCart(response?.data?.data?.cart);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  // useEffect(() => {
  //   setCart(cartSelector);
  // }, [cartSelector]);

  return {
    cart,
    user,
    loadingAuth,
    loadingUser,
    loadingCart,
    setLoadingUser,
    updateProfile,
    register,
    login,
    logout,
    changePassword,
    forgotPassword,
    verifyOTP,
    resetPassword,
    addItemToCart,
    decreaseItemFromCart,
    incresaseItemFromCart,
    removeItemFromCart,
    updateItemFromCart,
    clearCart,
    quickLogin,
    refreshCart,
  };
};

export const useFakeUserController = () => {
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
