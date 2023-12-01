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

export { getAllAddress };
