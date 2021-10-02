import './App.css';
import Header from './Components/Header/Header'
import Sidebar from './Components/Sidebar/Sidebar';
import Member from './Pages/Member/Member'
import Inventory from './Pages/Inventory'
import Footer from './Components/Footer/Footer'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

// import { BrowserRouter as Router, Switch , Route } from 'react-router-dom'

function App() {
  
  return (
    <>
    <div className="app">
      <Router>
        <Header />
        <div className="main">
          <Route path="/member" exact={true} component={Member} />
        </div>
        <Footer />
      </Router>
    </div>
    </>
  );
}

export default App;
