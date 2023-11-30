import { api } from "@/utils/axios";

const getVariant = async (id) => {
  try {
    const response = await api.get(`/web/variants/${id}`);
    return response.data;
  } catch (error) {
    return null;
  }
};

export default getVariant;
