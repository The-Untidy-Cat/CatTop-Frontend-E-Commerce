const { api } = require("@/utils/axios");

const getAllAddress = async () => {
  try {
    const response = await api.get(`/customer/address`);
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const addNewAddress = async (data) => {
  try {
    const response = await api.post(`/customer/address`, data);
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const editAddress = async (id, data) => {
  try {
    const response = await api.put(`/customer/address/${id}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export { getAllAddress, addNewAddress, editAddress };
