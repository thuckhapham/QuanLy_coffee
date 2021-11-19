import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './Components/Header/Header'
import Footer from './Components/Footer/Footer'
import OrderHistory from './Components/OrderHistory/OrderHistory';
import Homepage from './Pages/Homepage/Homepage';
import Member from './Pages/Member/Member'
import Order from './Pages/Order/Order'
import HistoryOrder from './Pages/HistoryOrder/HistoryOrder'
import Drink from './Pages/Menu Drink/Drink';
import Login from './Components/Login/Login';

// import { BrowserRouter as Router, Switch , Route } from 'react-router-dom'

function App() {

  return (
    <>
      <div className="app">
        <Router>
          <Header />
          <div className="main">
            <div className="main__path">
              <Route path="/auth/signin" exact={true} component={Login} />
              <Route path="/" exact={true} component={Homepage} />
              <Route path="/member" exact={true} component={Member} />
              <Route path="/order-history" exact={true} component={HistoryOrder} />
              <Route path="/order/:id" exact={true} component={Order} />
              <Route path="/menu-drink" exact={true} component={Drink} />
            </div>
            <OrderHistory />
          </div>
          <Footer />
        </Router>
      </div>
    </>
  );
}

export default App;
