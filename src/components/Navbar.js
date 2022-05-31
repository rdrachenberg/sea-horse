import React, {useEffect} from 'react';
import { useMoralis } from "react-moralis";
import logo from '../logo/seahorse.jpg';


const Navbar = () => {
    const {authenticate, isAuthenticated, isAuthenticating, user, logout } = useMoralis();
    
  useEffect(() => {
    if(isAuthenticated){
      console.log('is authenticated');
    }
  }, [isAuthenticated]);

  const login = async () => {
    
    if(!isAuthenticated) {
      await authenticate({signingMessage: 'Welcome to Sea Horse. You must sign this message to authenticate your awesome self!'})
      .then(function(user) {
        // console.log('Logged in user: ', user);
        // console.log(user.get("ethAddress"));
        // console.log('here is the account var ',account)
      })
      .catch(function(err) {
        console.log(err);
      })
    }
  }

  const logOut = async () => {
    await logout();
    console.log('You have been logged out!')
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark" id='navbar'>
        <a href='/'>
          <img src={logo} id='logo' style={{maxHeight: '30px', borderRadius: '6px', padding: '2px'}} alt='logo'/>
        </a>
        <a className="navbar-brand" href="/">
        Sea Horse
        </a>
    <button
      className="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarNavDropdown"
      aria-controls="navbarNavDropdown"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNavDropdown">
      <ul className="navbar-nav">
        <li className="nav-item active">
          <a className="nav-link" href="/">
            Home <span className="sr-only">(current)</span>
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/mint">
            Mint
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/explore">
            Explore
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/marketplace">
            Marketplace
          </a>
        </li>
        
      </ul>
    </div>
    {isAuthenticated? 
    <div id='address-div'>
        <p id='display-address'>{user.get('ethAddress')}</p>
    </div>
    : 
      <></>
    }
    {isAuthenticated? 
      <div id='login-logout-div'>
        <button id='logout' onClick={logOut} disabled={isAuthenticating}> Logout ✖️</button>
      </div>
      : <button id='login' onClick={login}> 🦊 MetaMask Login </button>}
      
  </nav>
  );
}

export default Navbar