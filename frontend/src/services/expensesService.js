import http from "./http";
import { apiEndPoint } from "../config.json";

export function getExpenses() {
  return http.get(apiEndPoint + "/expenses");
}
