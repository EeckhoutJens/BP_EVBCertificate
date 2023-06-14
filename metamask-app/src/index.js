import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Home from './components/Home/Home';
import Batteries from './components/Batteries/Batteries';
import Details from './components/Details/Details';
import Create from './components/Create/Create';
import Update from './components/Update/Update';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/batteries",
        element: <Batteries />,
      },
      {
        path: "/create",
        element: <Create />,
      },
      {
        path: "/update",
        element: <Update />,
      },
      {
        path: "/details/:id",
        element: <Details />,
      },
    ]
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

reportWebVitals();
