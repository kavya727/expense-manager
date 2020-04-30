import http from "./http";

import { apiEndPoint } from "../config.json";

export function getExpenses() {
  return http.get(apiEndPoint + "/expenses");
}

export function getCategoryList() {
  return http.get(apiEndPoint + "/categories");
}

export function updateExpenseList(reqPayload) {
  return http.put(apiEndPoint + "/expenses", reqPayload);
}

export function deleteExpenses(expense) {
  //to delete an element in a document, if deleting whole document -> use axios.Delete
  return http.put(apiEndPoint + "/expensesDelete", expense);
}
