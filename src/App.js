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
import Footer from "./components/Footer";


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
              <Route exact path='/'>
                <Home />
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
            </Switch>
            
            </div>
          : 
            <div className='login-message'>
              <h2> Please login to interact with Sea Horse</h2>
            </div>
          }
        <Footer />
      </div>
      </Router>
  );
}

export default App;
