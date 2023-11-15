import { notification } from "antd";

import { api } from "@/utils/axios";

const forgotPassword = async (email) => {
  try {
    const response = await api.post(`/auth/forgot-password`, {
      email,
    });
    return response.data;
  } catch (e) {
    throw e?.response?.data?.errors || e?.response?.data?.message || "Lỗi không xác định. Vui lòng thử lại sau";
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
    throw e?.response?.data?.errors || e?.response?.data?.message || "Lỗi không xác định. Vui lòng thử lại sau";
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
    throw e?.response?.data?.errors || e?.response?.data?.message || "Lỗi không xác định. Vui lòng thử lại sau";
  }
}

export { forgotPassword, verifyOTP, resetPassword };
