import React, { useEffect, useState, setState, useRef} from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import './App.css';
import { useMoralis, useMoralisWeb3Api, useERC20Balances, useNativeBalance } from "react-moralis";
import Navbar  from "./components/Navbar";
import Home from "./components/Home";
import Mint from './components/Mint';


function App() {
  const {isAuthenticated, isAuthenticating, user, setUserData, isUserUpdating} = useMoralis();
  const Web3Api = useMoralisWeb3Api();

  
  const [toggleUserData, setToggleUserData] = useState(false)
  const [toggleSuccess, setToggleSuccess] = useState(false)
  


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
        
      </div>
      </Router>
  );
}

export default App;
