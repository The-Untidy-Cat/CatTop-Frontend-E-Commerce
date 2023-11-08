import { notification } from "antd";

const { api } = require("@/utils/axios");

const forgotPassword = async (email) => {
  try {
    const response = await api.post(`/auth/forgot-password`, {
      email,
    });
    return response.data;
  } catch (e) {
    throw e?.response?.data?.message || "Lỗi máy chủ";
  }
};

export { forgotPassword };
