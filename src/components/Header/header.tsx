import React from 'react';

import "./header.css";
import logo from '../../images/logo.png';

const Header = () => {
    return (
        <header role="banner" className="header">
            <div className="headerContainer">
                <div className='imageContainer'>
                    <a href="https://www.royalmail.com" title="Royal Mail Home" rel="home">
                        <img className="imageStyle" src={logo} alt="Royal Mail Home" />
                    </a>
                    <h1>Barcode Validator</h1>
                </div>
            </div>
        </header>
    );
};

export default Header;