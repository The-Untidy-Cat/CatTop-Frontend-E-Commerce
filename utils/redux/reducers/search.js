const { ADD_KEYWORD, REMOVE_KEYWORD, CLEAR_KEYWORDS } = require("../actions/search");

function searchReducer(state = [], action) {
  switch (action.type) {
    case ADD_KEYWORD:
      if (state.includes(action.payload)) return state;
      return [...state, action.payload];
    case REMOVE_KEYWORD:
      return state.filter((item) => item !== action.payload);
    case CLEAR_KEYWORDS:
      return [];
    default:
      return state;
  }
}

export default searchReducer;