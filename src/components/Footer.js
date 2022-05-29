import React from 'react';

const Footer = () => {

    return (
        <div className='navbar fixed-bottom navbar-dark bg-dark' id='footer'>
            <a className='footer' href='/'><p>Home</p></a>
            <a className='footer' href='/mint'><p>Mint</p></a>
            <a className='footer' href='/explore'><p>Explore</p></a>
        </div>
    )
}

export default Footer