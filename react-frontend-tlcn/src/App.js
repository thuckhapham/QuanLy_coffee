import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import OrderHistory from "./Components/OrderHistory/OrderHistory";
import Homepage from "./Pages/Homepage/Homepage.jsx";
import Member from "./Pages/Member/Member";
import Order from "./Pages/Order/Order";
import HistoryOrder from "./Pages/HistoryOrder/HistoryOrder";
import Drink from "./Pages/Menu Drink/Drink";
import Login from "./Components/Login/Login";
import Profile from "./Pages/Profile/Profile";
import Table from "./Pages/Table/Table.jsx";
import Report from "./Pages/Report/Report.jsx";
import Header2 from "./NewComponents/Header2/Header";

// import { BrowserRouter as Router, Switch , Route } from 'react-router-dom'

function App() {
  return (
    <>
      <div className="app">
        <Router>
          {/* <Header /> */}
          <Header2 />
          <div className="main">
            <div className="container p-3">
              <Routes>
                <Route path="/login" exact={true} element={<Login />} />
                <Route path="/homepage" exact={true} element={<Homepage />} />
                <Route path="/home" exact={true} element={<Homepage />} />
                <Route path="/member" exact={true} element={<Member />} />
                <Route
                  path="/order-history"
                  exact={true}
                  element={<HistoryOrder />}
                />
                <Route path="/order/:id" exact={true} element={<Order />} />
                <Route path="/menu-drink" exact={true} element={<Drink />} />
                <Route path="/profile" exact={true} element={<Profile />} />
                <Route path="/table" exact={true} element={<Table />} />
                <Route path="/report" exact={true} element={<Report />} />
              </Routes>
            </div>
            {/* <OrderHistory /> */}
          </div>
          <Footer />
        </Router>
      </div>
    </>
  );
}

export default App;
