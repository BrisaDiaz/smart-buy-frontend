import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

import {Product, Market, TrackedProduct, TrackedPrice} from "../interfaces";
import {API_BASE_PATH} from "../constants";

export const marketsScraperApi = createApi({
  reducerPath: "marketsScraperApi",
  baseQuery: fetchBaseQuery({baseUrl: API_BASE_PATH as string}),
  tagTypes: ["Product", "TrackedProduct"],
  endpoints: (builder) => ({
    getProductsByMarkets: builder.query<
      {total: number; products: Product[]},
      {searchQuery: string; markets: Market[]}
    >({
      query: ({searchQuery, markets}) => {
        const query = new URLSearchParams();

        query.append("query", searchQuery);

        markets.forEach((market) => query.append("market", market));

        return `/api/v1/market/search?${query.toString()}`;
      },
      providesTags: (result) =>
        result
          ? result.products.map((product) => ({
              type: "Product",
              link: product.link,
            }))
          : ["Product"],
      // cache valid for 10min
      keepUnusedDataFor: 60 * 10,
    }),
    getTrackedProductRecordByLink: builder.query<
      {
        product: TrackedProduct;
        priceHistory: TrackedPrice[];
      },
      string
    >({
      query: (link) => {
        return API_BASE_PATH + `/api/v1/tracker/products?link=${link}`;
      },
      providesTags: (result) =>
        result
          ? [
              {
                type: "TrackedProduct",
                link: result.product.link,
              },
            ]
          : ["TrackedProduct"],
    }),
    createTrackingProductRecord: builder.mutation<TrackedProduct, Product>({
      query: (product) => ({
        url: "/api/v1/tracker/products",
        method: "POST",
        body: {product},
      }),
      invalidatesTags: (result, error, arg) => [{type: "TrackedProduct", link: arg.link}],
    }),
    updateTrackingProductPrice: builder.mutation<
      {
        product: TrackedProduct;
        priceHistory: TrackedPrice[];
      },
      {link: string; price?: number}
    >({
      query: ({link, price}) => ({
        url: API_BASE_PATH + `/api/v1/tracker/products?link=${link}`,
        method: "PUT",
        body: price ? {price} : {},
      }),
      invalidatesTags: (result, error, arg) => [{type: "TrackedProduct", link: arg.link}],
    }),
  }),
});
export const {
  useLazyGetProductsByMarketsQuery,
  useGetTrackedProductRecordByLinkQuery,
  useCreateTrackingProductRecordMutation,
  useUpdateTrackingProductPriceMutation,
} = marketsScraperApi;
