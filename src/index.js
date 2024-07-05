import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { HomePage } from "./pages/HomePage/HomePage.jsx";
import { TrendingPage } from "./pages/HomePage/TrendingPage.jsx";
import { MoviesPage } from "./pages/MoviesPage/MoviesPage.jsx";
import { SeriesPage } from "./pages/SeriesPage/SeriesPage.jsx";
import { ErrorPage } from "./pages/ErrorPage/ErrorPage.jsx";
import { FilmPage } from "./pages/FilmPage/FilmPage.jsx";
import { SearchPage } from "./pages/SearchPage/SearchPage.jsx";
import { store } from "./store/store.js";
import { SerialsDetailsPage } from "./pages/SerialsDetailsPage/SerialsDetailsPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <TrendingPage />,
      },
      {
        path: "/movies",
        element: <MoviesPage />,
      },
      {
        path: "/tv-series",
        element: <SeriesPage />,
      },
      {
        path:'/series',
        children: [
          {
            path: ":id",
            element: <SerialsDetailsPage />,
          },
        ],
      },
      {
        path: "/search",
        element: <SearchPage />,
      },
      {
        path: "/films",
        children: [
          {
            path: ":id",
            element: <FilmPage />,
          },
        ],
      },
    ],
  },
]);

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
