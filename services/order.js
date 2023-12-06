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

export const getOrder = async (id) => {
  try {
    const response = await api.get(`/customer/orders/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const rateOrderItem = async ({ orderId, itemId, data }) => {
  try {
    const response = await api.post(`/customer/orders/${orderId}/items/${itemId}/rate`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
}
