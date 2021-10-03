import './App.css';
import Header from './Components/Header/Header'
import Sidebar from './Components/Sidebar/Sidebar';
import Member from './Pages/Member/Member'
import Inventory from './Pages/Homepage/Homepage'
import Footer from './Components/Footer/Footer'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import OrderHistory from './Components/OrderHistory/OrderHistory';
import Homepage from './Pages/Homepage/Homepage';

// import { BrowserRouter as Router, Switch , Route } from 'react-router-dom'

function App() {

  return (
    <>
      <div className="app">
        <Router>
          <Header />
          <div className="main">
            <Route path="/" exact={true} component={Homepage} />
            <Route path="/member" exact={true} component={Member} />
            <OrderHistory />
          </div>
          <Footer />
        </Router>
      </div>
    </>
  );
}

export default App;
