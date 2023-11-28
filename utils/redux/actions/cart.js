export const INCREASE_AMOUNT = "INCREASE_AMOUNT";
export const DECREASE_AMOUNT = "DECREASE_AMOUNT";
export const ADD_ITEM = "ADD_ITEM";
export const REMOVE_ITEM = "REMOVE_ITEM";
export const CLEAR_CART = "CLEAR_CART";
export const GET_TOTAL = "GET_TOTAL";
export const CHANGE_AMOUNT = "CHANGE_AMOUNT";

export function increaseQuantity(payload) {
  return {
    type: "INCREASE_AMOUNT",
    payload,
  };
}
export function decreaseQuantity(payload) {
  return {
    type: "DECREASE_AMOUNT",
    payload,
  };
}
export function addItem(payload) {
  return {
    type: "ADD_ITEM",
    payload,
  };
}
export function removeItem(payload) {
  return {
    type: "REMOVE_ITEM",
    payload,
  };
}
export function clearCart(payload) {
  return {
    type: "CLEAR_CART",
    payload,
  };
}
export function getTotal(payload) {
  return {
    type: "GET_TOTAL",
    payload,
  };
}
