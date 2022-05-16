import React, {useEffect, useState, useRef} from 'react';
import { useMoralis, useMoralisWeb3Api, useERC20Balances, useNativeBalance } from "react-moralis";
import Cards from "./Cards";
// import Moralis from 'moralis';


const Home = () => {
    const {isAuthenticated, isAuthenticating, user, setUserData, isUserUpdating} = useMoralis();
  const Web3Api = useMoralisWeb3Api();

  const { fetchERC20Balances, data, isLoading, isFetching, error } =
  useERC20Balances();

  let account;

  const [toggleUserData, setToggleUserData] = useState(false)
  const [toggleSuccess, setToggleSuccess] = useState(false)
  const [toggleLogoutMessage, settoggleLogoutMessage] = useState(false);

  const [toggleNameInput, setToggleNameInput] = useState(true);

  const [usersName, setUsersName] = useState()
  const [balance, setBalance] = useState('0');

  const usersFirstName = useRef('');

  if(isAuthenticated) {
    account = (user.get('ethAddress'))
  }

  const handleAccountInfoClick = () => {
    setToggleUserData(!toggleUserData)
  }

  const handleNameInputClick = (e) => {
    e.preventDefault();
    const name = usersFirstName.current.value;
    console.log(name);

    setToggleNameInput(false);
    setUsersName(name);
    setUserData({
      username: name
    })
    usersFirstName.current.value = ''
    console.log(user.attributes.username);
  }

  function NativeBalance() {
    const {getBalance, data: balance, nativeToken, error, isLoading} = useNativeBalance({ chain: "ropsten" });
    if(error) {
      return error
    }
    // console.log(balance);
    return balance
  }

  let balanceResult = Object.values(NativeBalance());
//   console.log(balanceResult[0]);

  useEffect(() => {   
    if(isAuthenticated) {
        setToggleUserData(true);
        setToggleSuccess(true);

        setTimeout(() => {
            setToggleSuccess(false)
          }, 5000);
    
          setTimeout(() => {
            setToggleUserData(false)
          }, 10000)

    }
  }, [user, isAuthenticated])

  useEffect(() => {
    if(balance === '0') {
        setTimeout(() => {
            setBalance(balanceResult[0])
            console.log(balanceResult);
            // console.log(balance)
        }, 2000)   
    } 
  }, [balance, balanceResult])
    return (
        <div>
        {toggleSuccess? 
            <div className="alert alert-success" role="alert">
              You have logged in succesfully
            </div>
            : 
            <></>
          }
          {isAuthenticated?
          <div>
          <div >
            {toggleUserData?
              <div className="row">
              <div id='welcome-div' onClick={handleAccountInfoClick}>
                <h5 className="welcome-text">Your user id is: {user.id}</h5>
                <h5 className="welcome-text">Your eth account is: {account}</h5>
                <h5 className="welcome-text">Your balance is: {balance}</h5>
              </div>
              </div>
              :
              <div id='welcome-div-hidden' onClick={handleAccountInfoClick}>
                Account Info
              </div>}   
          </div>
            
            <div>
            {usersName ?  
              <div>
                <div>
                    <h4>Welcome {usersName}</h4>
                </div>
                <div>
                <Cards />
                </div>
              </div>
            : 
            <div id="name">
              <div className="input-group mb-6" style={{alignItems: "center"}}>
                <input type="text" className="form-control" placeholder="Whats your name?" aria-label="Your name" aria-describedby="basic-addon2" ref={usersFirstName}/>
                <div className="input-group-append">
                  <button className="btn btn-primary"  onClick={handleNameInputClick} disabled={isUserUpdating}>Button</button>
                </div>
              </div>
            </div>
            }
            </div>
          </div>
          : 
          <div className='login-message'>
          <h2> Please login to interact with Sea Horse</h2>
          </div>
          }
          
        </div>
    )
}

export default Home