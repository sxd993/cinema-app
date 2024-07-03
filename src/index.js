import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider, createRoutesFromElements, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { HomePage } from './pages/HomePage.jsx';
import { CatalogPage } from './pages/CatalogPage/CatalogPage.jsx';
import { ErrorPage } from './pages/ErrorPage/ErrorPage.jsx';
import { FilmPage } from './pages/FilmPage/FilmPage.jsx';
import { store } from './store/store.js';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<HomePage />} errorElement={<ErrorPage />}>
        <Route index element={<CatalogPage />} />
      </Route>
      <Route path="/films" element={<HomePage />}>
        <Route path=":id" element={<FilmPage />} />
      </Route>
    </>
  )
);

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
