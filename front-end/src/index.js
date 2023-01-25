import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserRouter, RouterProvider, useRouteError } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import './index.css';
import Login from './pages/Login';
import Products from './pages/Products';
import Orders from './pages/Orders';
import App from './App';
import ErrorPage from './pages/ErrorPage';
import Register from './pages/Register';
import Checkout from './pages/Checkout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorBoundary />,
    children: [
      { path: '/', element: <Login /> },
      { path: '/customer/products', element: <Products /> },
      { path: '/seller/orders', element: <Orders /> },
      { path: '/customer/checkout', element: <Checkout /> },
    ],
  },
  { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> },
]);

function ErrorBoundary() {
  const error = useRouteError();

  return <ErrorPage e={ error } />;
}

ReactDOM.render(
  <React.StrictMode>
    <RouterProvider router={ router } />
  </React.StrictMode>,
  document.getElementById('root'),
);

reportWebVitals();
