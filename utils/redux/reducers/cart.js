import { combineReducers } from "redux";
import {
  ADD_ITEM,
  REMOVE_ITEM,
  CLEAR_CART,
  INCREASE_AMOUNT,
  DECREASE_AMOUNT,
  GET_TOTAL,
  CHANGE_AMOUNT,
} from "../actions/cart";

const initialState = {
  cart: [],
  total: 0,
};

function cartReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_ITEM:
      if (
        state.cart.find((item) => item.variant_id === action.payload.variant_id)
      ) {
        return {
          ...state,
          cart: state.cart.map((item) => {
            if (item.variant_id === action.payload.variant_id) {
              return {
                ...item,
                amount: item.amount + action.payload.amount,
              };
            }
            return item;
          }),
        };
      } else {
        return {
          ...state,
          cart: [...state.cart, action.payload],
        };
      }
    case REMOVE_ITEM:
      return {
        ...state,
        cart: state.cart.filter((item) => item.variant_id !== action.payload),
      };
    case CLEAR_CART:
      return {
        ...state,
        cart: [],
      };
    case INCREASE_AMOUNT:
      return {
        ...state,
        cart: state.cart.map((item) => {
          if (item.variant_id === action.payload) {
            return {
              ...item,
              amount: item.amount + 1,
            };
          }
          return item;
        }),
      };
    case DECREASE_AMOUNT:
      return {
        ...state,
        cart: state.cart.map((item) => {
          if (item.variant_id === action.payload) {
            return {
              ...item,
              amount: item.amount - 1,
            };
          }
          return item;
        }),
      };
    case CHANGE_AMOUNT:
      return {
        ...state,
        cart: state.cart.map((item) => {
          if (item.variant_id === action.payload.variant_id) {
            return {
              ...item,
              amount: action.payload.amount,
            };
          }
          return item;
        }),
      };
    default:
      return state;
  }
}
export default cartReducer;
