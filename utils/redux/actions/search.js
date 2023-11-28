export const ADD_KEYWORD = "ADD_KEYWORD";
export const REMOVE_KEYWORD = "REMOVE_KEYWORD";
export const CLEAR_KEYWORDS = "CLEAR_KEYWORDS";
export const GET_KEYWORDS = "GET_KEYWORDS";

export function addKeyword(payload) {
  return {
    type: "ADD_KEYWORD",
    payload,
  };
}
export function removeKeyword(payload) {
  return {
    type: "REMOVE_KEYWORD",
    payload,
  };
}
export function clearKeywords(payload) {
  return {
    type: "CLEAR_KEYWORDS",
    payload,
  };
}
