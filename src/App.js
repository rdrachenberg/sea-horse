import React, { useEffect, Suspense, lazy} from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import './App.css';
import { useMoralis } from "react-moralis";
import LoadingSpinner from "./components/Spinner";


const Navbar = lazy(() => import("./components/Navbar"));
const Home = lazy(() => import("./components/Home"));
const Mint = lazy(() => import("./components/Mint"));
const Explore = lazy(() => import("./components/Explore"));
const Transfer = lazy(() => import("./components/Transfer"));
const MintFees = lazy(() => import("./components/MintFees"));
const Footer = lazy(() => import("./components/Footer"));
const FourOFour = lazy(() => import("./components/404"));
const Welcome = lazy(() => import("./components/Welcome"));
const Marketplace = lazy(() => import("./components/Marketplace"));

function App() {
  const { isAuthenticated } = useMoralis();

  useEffect(() => {
    if(isAuthenticated) {
      console.log('is auth')
    }
  }, [ isAuthenticated])

  return (
    <Router>
      <Suspense fallback={<LoadingSpinner />}>
        <div className="App" >
          <Navbar />
            {isAuthenticated?
              <div>
                <Switch>
                  <Route exact path='/' component={Home} />     
                  <Route exact path='/mint' component={Mint} />
                  <Route exact path='/explore' component={Explore} />
                  <Route exact path='/transfer' component={Transfer} />
                  <Route exact path='/mint-fees' component={MintFees} />
                  <Route exact path='/marketplace' component={Marketplace} />
                  <Route exact path='*' component={FourOFour} />
                </Switch>
              </div>
            : 
              <div>
                <Switch>
                  <Route exact path='*' component={Welcome} />
                </Switch>
              </div>
            }
          <Footer />
        </div>
      </Suspense>
    </Router>
  );
}

export default App;
