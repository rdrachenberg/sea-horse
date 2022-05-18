import React, { useEffect, useState} from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import './App.css';
import { useMoralis, useMoralisWeb3Api } from "react-moralis";
import Navbar  from "./components/Navbar";
import Home from "./components/Home";
import Mint from './components/Mint';
import Footer from "./components/Footer";


function App() {
  const {isAuthenticated, isAuthenticating, user, setUserData, isUserUpdating} = useMoralis();
  

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
