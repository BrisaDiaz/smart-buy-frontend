import {MARKET_OPTIONS} from "../constants";
export const generateSearchUrl = ({search, markets}: {search?: string; markets?: string[]}) => {
  const params = new URLSearchParams(new URL(window.location.toString()).search);

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