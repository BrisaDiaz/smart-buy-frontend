import { API_BASE_PATH } from "../constants";
export async function getMarketsProducts(search: string, markets: string[]) {
  const query = new URLSearchParams();

  query.append("query", search);

  markets.forEach((market) => query.append("market", market));

  const res = await fetch(
    `${API_BASE_PATH}/api/v1/market/search?${query.toString()}`,
  );

  const json = await res.json();

  return json;
}
