const { api } = require("@/utils/axios");

const getAllBrand = async () => {
  try {
    const response = await api.get(`/web/brands`);
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export { getAllBrand };
