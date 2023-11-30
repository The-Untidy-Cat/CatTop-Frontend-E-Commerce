import { api } from "@/utils/axios";

const searchProduct = async ({
  name,
  min_price,
  max_price,
  brand,
  offset,
  limit,
  order,
  order_by,
}) => {
  try {
    const params = {};
    if (name) params.name = name;
    if (min_price) params.min_price = min_price;
    if (max_price) params.max_price = max_price;
    if (brand) params.brand = brand;
    if (offset) params.offset = offset;
    if (limit) params.limit = limit;
    if (order) params.order = order;
    if (order_by) params.order_by = order_by;
    const response = await api.get("/web/search", {
      params,
      paramsSerializer: {
        indexes: true, 
      }
    });
    return response?.data;
  } catch (e) {
    console.log("error", e);
    return null;
  }
};

export { searchProduct };
