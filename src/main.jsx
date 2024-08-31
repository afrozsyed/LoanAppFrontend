import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { Provider } from 'react-redux';
import store from './store/store.js';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './components/pages/Login.jsx';
import AuthLayout from './components/AuthLayout.jsx';
import {
  Emicalculator,
  LoanApplicationForm,
  LoanReport,
  PaymentCollection,
  AllLoansPage,
  Dashboard,
  PaymentReceipt,
  Reports,
  ReportPreview,
  LoanReportPrint
} from "./components/componentLib.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthLayout  authentication = {true} ><App /></AuthLayout>,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "/applyLoan",
        element: <LoanApplicationForm />,
      },
      {
        path: "/loanDetails/:accountNumber",
        element: <LoanReport />
      },
      {
        path: "/emiCalculator",
        element: <Emicalculator />,
      },
      {
        path: "/paymentCollection",
        element: <PaymentCollection />,
      },
      {
        path: "/allLoans",
        element: <AllLoansPage />,
      },
      {
        path: "/reports",
        element: <Reports />,
      },
    ],
  },{
    path: "/login",
    element: <Login />,
  },
  {
    path: "/paymentRecipt",
    element: <PaymentReceipt />,
  },
  {
    path: "/reportPreview",
    element: <ReportPreview />,
  },
  {
    path: "/loanReportPrint",
    element: <LoanReportPrint />,
  },
  {
    path: "*",
    element: <div> This page does not exist

    </div>,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
