import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter, Routes, Route} from 'react-router-dom';
import 'antd/dist/antd.css';
import './index.css';
import {Provider} from 'react-redux';

import App from './pages/App';
import Product from './pages/Product';
import Search from './pages/Search';
import NotFound from './pages/404';
import {store} from './store';
import SearchURLHandler from './components/SearchURLHandler';

const routes = [
  {element: <App />, path: '/'},
  {element: <Product />, path: '/product/:slug'},
  {element: <Search />, path: '/search'},
  {element: <NotFound />, path: '*'},
];

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <HashRouter>
        <Routes>
          {routes.map((route) => (
            <Route
              key={route.path}
              element={<SearchURLHandler>{route.element}</SearchURLHandler>}
              path={route.path}
            />
          ))}
        </Routes>
      </HashRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
