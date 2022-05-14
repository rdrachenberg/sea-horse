import React, { useEffect, useState, setState, useRef} from "react";
import './App.css';
import { useMoralis } from "react-moralis";
import Navbar  from "./components/Navbar";


function App() {
  const {isAuthenticated, isAuthenticating, user} = useMoralis();
  let account;

  const [toggleUserData, setToggleUserData] = useState(false)

  if(isAuthenticated) {
    account = (user.get('ethAddress'))
  }

  const handleAccountInfoClick = () => {
    setToggleUserData(!toggleUserData)
  }
  

  useEffect(() => {
    if(isAuthenticated) {
      setToggleUserData(true);

      setTimeout(() => {
        setToggleUserData(false)
      }, 10000)
    }
  }, [user, isAuthenticated])
  return (
    <div className="App" >
      <Navbar/>
      
      {isAuthenticated? 
      <div>
        {toggleUserData?
        <div id='welcome-div' onClick={handleAccountInfoClick}>
          <h4>Welcome!</h4>
          <h5>Your user id is: {user.id}</h5>
          <h5>Your eth account is: {account}</h5>
        </div>
        :<div id='welcome-div-hidden' onClick={handleAccountInfoClick}>
          Account Info
        </div>}
        
      </div>
      : <></>
      }
      
    </div>
  );
}

export default App;
