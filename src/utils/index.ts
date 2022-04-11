import {MARKET_OPTIONS} from "../constants";
import {Product} from "../interfaces";

export const generateSearchUrl = ({search, markets}: {search?: string; markets?: string[]}) => {
  const params = new URLSearchParams(new URL(window.location.toString().replace("/#", "")).search);

  const searchQuery = search || params.get("query");
  const marketsQuery = markets || [
    ...new Set(params.getAll("market").filter((market) => MARKET_OPTIONS.includes(market))),
  ];

  const query = new URLSearchParams();

  if (searchQuery && typeof searchQuery === "string") query.append("query", searchQuery);
  if (marketsQuery.length > 0)
    marketsQuery.length > 3
      ? marketsQuery.slice(0, 3).forEach((market) => query.append("market", market as string))
      : marketsQuery.forEach((market) => query.append("market", market as string));

  const queryString = query.toString();
  const searchURL = `/search${queryString ? `?${queryString}` : ""}`;

  return searchURL;
};

export const getValidSearchParams = () => {
  const validSearchURL = generateSearchUrl({});

  const params = new URLSearchParams(validSearchURL.split("?")[1]);

  return {markets: params.getAll("market"), query: params.get("query") || ""};
};

export const generateSlug = (string: string) => {
  const slug = string.trim().toLowerCase().replaceAll(" ", "-");

  return slug;
};
export const generateProductUrl = (product: Product) => {
  const slug = product.title.trim().toLowerCase().replaceAll(" ", "-");
  const query = new URLSearchParams();

  Object.entries(product).forEach((entry) => query.append(entry[0], entry[1]));
  const url = `/product/${slug}?${query.toString()}`;

  return url;
};
export const extractProductDataFromParams = (searchParams: string) => {
  const query = new URLSearchParams(searchParams);
  const product = {
    title: query.get("title"),
    market: query.get("market"),
    link: query.get("link"),
    image: query.get("image"),
    price: parseInt(query.get("price") || "0"),
  };

  if (!Object.values(product).every((prop) => Boolean(prop))) return undefined;

  return product;
};
