import React from 'react';

import {Link} from 'react-router-dom';
import {BiError} from 'react-icons/bi';

import './404.scss';

const NotFound = () => {
  return (
    <div className="mainContainer">
        <h1><BiError/></h1>
        <Link to="/">
            <h2>404 Page Not Found. Click here to go back</h2>
        </Link>     
    </div>
  )
}

export default NotFound