import { api } from "@/utils/axios";

export const checkOut = async ({ data, type }) => {
  try {
    if (type === "cart") {
      const response = await api.post(`/customer/orders`, {
        ...data,
        cart: undefined,
      });
      return response.data;
    } else {
      console.log(data)
      const response = await api.post(`/customer/orders`, {
        ...data,
        cart: undefined,
        items: [
          ...data.cart.map((item) => ({
            variant_id: item.variant.id,
            amount: item.amount,
          })),
        ],
      });
      return response.data;
    }
  } catch (error) {
    throw error;
  }
};

export const getOrders = async () => {
  try {
    const response = await api.get("/customer/orders");
    return response.data;
  } catch (error) {
    throw error;
  }
}
