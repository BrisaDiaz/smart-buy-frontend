import {Product} from "../interfaces";
import { API_BASE_PATH } from "../constants";
export async function getTrackedProduct(link: string) {
  const res = await fetch(
    `${API_BASE_PATH}/api/v1/tracker/products?link=${link}`,
  );

  const json = await res.json();

  return json;
}
export async function createProductRecord(product: Product) {
  const res = await fetch(`${API_BASE_PATH}/api/v1/tracker/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ product }),
  });
  const json = await res.json();

  return json;
}
