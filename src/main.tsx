import React from "react";
import ReactDOM from "react-dom";
import {QueryClient, QueryClientProvider} from "react-query";
import {HashRouter, Routes, Route} from "react-router-dom";

import "antd/dist/antd.css";
import "./index.css";
import App from "./pages/App";
import Product from "./pages/Product";
import Search from "./pages/Search";
import NotFound from "./pages/404";
const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <HashRouter >
        <Routes>
          <Route element={<App />} path="/" />
          <Route element={<Product />} path="/product/:slug" />
          <Route element={<Search />} path="/search" />
          <Route element={<NotFound />} />
        </Routes>
      </HashRouter>
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById("root"),
);
