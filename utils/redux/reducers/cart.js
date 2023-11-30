import {
  ADD_ITEM,
  REMOVE_ITEM,
  CLEAR_CART,
  INCREASE_AMOUNT,
  DECREASE_AMOUNT,
  GET_TOTAL,
  CHANGE_AMOUNT,
  SET_CART,
} from "../actions/cart";

function cartReducer(state = [], action) {
  switch (action.type) {
    case SET_CART:
      return action.payload;
    case ADD_ITEM:
      if (state?.find((item) => item.variant_id === action.payload.variant_id)) {
        return state.map((item) => {
          if (item.variant_id === action.payload.variant_id) {
            return {
              ...item,
              amount: item.amount + action.payload.amount,
            };
          }
          return item;
        });
      } else {
        return [...state, action.payload];
      }
    case REMOVE_ITEM:
      return state.filter((item) => item.variant_id !== action.payload);
    case CLEAR_CART:
      return [];
    case INCREASE_AMOUNT:
      return state.map((item) => {
        if (item.variant_id === action.payload) {
          return {
            ...item,
            amount: item.amount + 1,
          };
        }
        return item;
      });
    case DECREASE_AMOUNT:
      return state.map((item) => {
        if (item.variant_id === action.payload) {
          return {
            ...item,
            amount: item.amount - 1,
          };
        }
        return item;
      });
    case CHANGE_AMOUNT:
      return state.map((item) => {
        if (item.variant_id === action.payload.variant_id) {
          return {
            ...item,
            amount: action.payload.amount,
          };
        }
        return item;
      });
    default:
      return state;
  }
}
export default cartReducer;
