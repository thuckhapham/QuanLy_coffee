import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './Components/Header/Header'
import Footer from './Components/Footer/Footer'
import OrderHistory from './Components/OrderHistory/OrderHistory';
import Homepage from './Pages/Homepage/Homepage';
import Member from './Pages/Member/Member'
import Order from './Pages/Order/Order'
import HistoryOrder from './Pages/HistoryOrder/HistoryOrder'
import Login from './Pages/Login/Login'

// import { BrowserRouter as Router, Switch , Route } from 'react-router-dom'

function App() {

  return (
    <>
      <div className="app">
        <Router>
          <Header />
          <div className="main">
            <div className="main__path">
              <Route path="/" exact={true} component={Homepage} />
              <Route path="/member" exact={true} component={Member} />
              <Route path="/orderhistory" exact={true} component={HistoryOrder} />
              <Route path="/order/:id" exact={true} component={Order} />
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
