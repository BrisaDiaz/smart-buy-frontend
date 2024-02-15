import {configureStore} from '@reduxjs/toolkit';
import {setupListeners} from '@reduxjs/toolkit/query';

import {marketSlice} from './features/market/marketSlice';
import {marketsScraperApi} from './services';
export const store = configureStore({
  reducer: {
    marketSearch: marketSlice.reducer,
    [marketsScraperApi.reducerPath]: marketsScraperApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(marketsScraperApi.middleware),
  devTools: true,
});
setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
