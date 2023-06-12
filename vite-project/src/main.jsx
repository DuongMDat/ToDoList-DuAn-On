import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login from './Components/Login.jsx';
import List from './Components/Home.jsx';
import Detail from './Components/Details.jsx';
import Home from './Components/Home.jsx';
import PrivateRouter from './Components/Private/PrivateRouter.jsx';
import NewHome from './Components/NewHome.jsx';
import Add from './Components/TodoList/Add.jsx';
const router = createBrowserRouter([
  {
    path: "/",
    element: <Login></Login>,
  },
  {
    path: "/home",
    element:
      <PrivateRouter>
        <Home></Home>
      </PrivateRouter>
  },
  {
    path: "/chi-tiet/:id",
    element: <PrivateRouter><Detail></Detail></PrivateRouter>

  }, {
    path: "/new-home",
    element: <NewHome></NewHome>
  }, {
    path: '/add',
    element: <PrivateRouter><Add></Add></PrivateRouter>
  }
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
