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
              <Route exact path='*'>
                <FourOFour />
              </Route>
            </Switch>
            </div>
          : 
            <div className='login-message'>
              <div>
                <h2 className='login-text'> Please login to interact with Sea Horse</h2>
                <h4 className='login-text'>Sea Horse is your all-in-one NFT owner dashboard, minter, and marketplace.</h4>
              </div>
              <img id='login-img' src='https://cdn.pixabay.com/photo/2016/10/18/19/05/bolt-1751089_960_720.jpg' alt='locked door'></img>
            </div>
          }
        <Footer />
      </div>
      </Router>
  );
}

export default App;
