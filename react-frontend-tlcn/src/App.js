import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
  Navigate,
} from "react-router-dom";

import Homepage from "./Pages/Homepage/Homepage.jsx";
import Order from "./Pages/Order/Order";
import HistoryOrder from "./Pages/HistoryOrder/HistoryOrder";
import Drink from "./Pages/Menu Drink/Drink";
import Login from "./Components/Login/Login";
import Profile from "./Pages/Profile/Profile";
import Report from "./Pages/Report/Report.jsx";
import About from "./Pages/About/About.jsx";
import ClientTrack from "./Pages/ClientTrack/ClientTrack";

import { ParallaxProvider } from "react-scroll-parallax";
import Page404 from "./Components/Page404";
import QLNV from "./Pages/QLNV";

import React from "react";
import ShiftAdmin from "./Pages/ShiftAdmin";
import Footer from "./Components/Footer/Footer";

const PrivateRoute = ({ children }) => {
  return localStorage.getItem("tokenBearer") !== null ? (
    children
  ) : (
    <Navigate to="/login" />
  );
};

const NotLoginAgain = ({ children }) => {
  return localStorage.getItem("tokenBearer") == null ? (
    children
  ) : (
    <Navigate to="/home" />
  );
};

function App() {
  return (
    <>
      <div className="app">
        <ParallaxProvider>
          <Router>
            <Routes>
              <Route
                path="/login"
                exact={true}
                element={
                  <NotLoginAgain>
                    <Login />
                  </NotLoginAgain>
                }
              />
              <Route
                path="/"
                exact={true}
                element={
                  <PrivateRoute>
                    <Homepage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/home"
                exact={true}
                element={
                  <PrivateRoute>
                    <Homepage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/order-history"
                element={
                  <PrivateRoute>
                    <HistoryOrder />
                  </PrivateRoute>
                }
              />
              <Route
                path="/order/:id"
                exact={true}
                element={
                  <PrivateRoute>
                    <Order />
                  </PrivateRoute>
                }
              />
              <Route
                path="/menu-drink"
                exact={true}
                element={
                  <PrivateRoute>
                    <Drink />
                  </PrivateRoute>
                }
              />
              <Route
                path="/profile"
                exact={true}
                element={
                  <PrivateRoute>
                    <Profile />
                  </PrivateRoute>
                }
              />
              <Route
                path="/shift"
                exact={true}
                element={
                  <PrivateRoute>
                    <ShiftAdmin />
                  </PrivateRoute>
                }
              />
              <Route
                path="/report"
                exact={true}
                element={
                  <PrivateRoute>
                    <Report />
                  </PrivateRoute>
                }
              />
              <Route path="/track" exact={true} element={<ClientTrack />} />
              <Route path="/about" exact={true} element={<About />} />
              <Route
                path="/qlnv"
                exact={true}
                element={
                  <PrivateRoute>
                    <QLNV />
                  </PrivateRoute>
                }
              />{" "}
              <Route
                path="/404"
                exact={true}
                element={
                  <PrivateRoute>
                    <Page404 />
                  </PrivateRoute>
                }
              />{" "}
              <Route
                path="/*"
                exact={true}
                element={
                  <PrivateRoute>
                    <Page404 />
                  </PrivateRoute>
                }
              />
            </Routes>
            {/* <OrderHistory /> */}
          </Router>
        </ParallaxProvider>
        {/* <Footer /> */}
      </div>
    </>
  );
}

export default App;
