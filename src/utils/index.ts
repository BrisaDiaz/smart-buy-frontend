import {MARKET_OPTIONS} from "../constants";
import {Product, Market} from "../interfaces";

export const generateSearchUrl = ({search, markets}: {search?: string; markets?: any[]}) => {
  const params = new URLSearchParams(new URL(window.location.toString().replace("/#", "")).search);

  const searchQuery = search || params.get("query");
  const marketsQuery = markets || [
    ...new Set(
      params.getAll("market").filter((market) => MARKET_OPTIONS.includes(market as Market)),
    ),
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

  query.append("link", product.link);
  const url = `/product/${slug}?${query.toString()}`;

  return url;
};

export const fixStringNumber = (number: string) => {
  const units: {[key: number]: number} = {
    1: 10,
    2: 100,
    3: 1000,
    4: 10000,
  };
  const isEsFormat = number.indexOf(",");
  let integer, decimal;

  if (isEsFormat !== -1) {
    [integer, decimal] = number.split(",");
  } else {
    [integer, decimal] = number.split(".");
  }

  if (!decimal) return parseInt(integer);

  const fixedNumber = Math.floor(parseInt(integer)) + parseInt(decimal) / units[decimal.length];

  return fixedNumber;
};
