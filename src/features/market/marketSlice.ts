import {createSlice} from "@reduxjs/toolkit";

import {Market} from "../../interfaces";

export interface MarketState {
  searchQuery: string;
  markets: Market[];
}
const initialState: MarketState = {
  searchQuery: "",
  markets: [],
};

export const marketSlice = createSlice({
  name: "marketSearch",
  initialState,
  reducers: {
    setSearchQuery: (state: MarketState, action: {payload: string}) => {
      state.searchQuery = action.payload;
    },
    setMarkets: (state: MarketState, action: {payload: Market[]}) => {
      state.markets = action.payload;
    },
  },
});

export const {setSearchQuery, setMarkets} = marketSlice.actions;
