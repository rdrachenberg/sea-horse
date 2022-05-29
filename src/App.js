import React, { useEffect} from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import './App.css';
import { useMoralis } from "react-moralis";
import Navbar  from "./components/Navbar";
import Home from "./components/Home";
import Mint from './components/Mint';
import Explore from './components/Explore';
import Transfer from './components/Transfer';
import MintFees from "./components/MintFees";
import Footer from "./components/Footer";
import FourOFour from "./components/404";
import Welcome from "./components/Welcome";
import Marketplace from "./components/Marketplace";




function App() {
  const { isAuthenticated } = useMoralis();
  

  useEffect(() => {
    if(isAuthenticated) {
      console.log('is auth')
    }
  }, [ isAuthenticated])

  return (
    <Router>
      <div className="App" >
        <Navbar />
          {isAuthenticated?
            <div>
              <Switch>
                <Route exact path='/' component={Home}>
                </Route>
                <Route exact path='/mint'>
                  <Mint />
                </Route>
                <Route exact path='/explore'>
                  <Explore />
                </Route>
                <Route exact path='/transfer'>
                  <Transfer />
                </Route>
                <Route exact path='/mint-fees'>
                  <MintFees />
                </Route>
                <Route exact path='/marketplace'>
                  <Marketplace />
                </Route>
                <Route exact path='*'>
                  <FourOFour />
                </Route>
              </Switch>
            </div>
          : 
            <div>
              <Switch>
                <Route exact path='/' component={Welcome} />
              </Switch>
            </div>
          }
        <Footer />
      </div>
    </Router>
  );
}

export default App;
