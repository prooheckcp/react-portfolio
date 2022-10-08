import React, {useState} from 'react';
import './Navbar.scss';
import {images} from '../../constants'
import { Link } from 'react-router-dom'; 
import { HashLink } from 'react-router-hash-link';
//@ts-ignore
import HamburgerMenu from './HamburgerMenu.tsx';

const sections : Array<string> = ['home', 'about', 'work', 'skills', 'testimonials', 'contact']

const Navbar = () => {
  const [toggle, setToggle] = useState<boolean>(false);

  return (
    
    <nav className="app__navbar">
      <div className="app__navbar-logo">
        <Link to="/">
          <img src={images.logo} alt="logo" />
        </Link>  
      </div>
      <ul className="app__navbar-links">
        {sections.map(item =>
        <li className="app__flex p-text" key={`link-${item}`}>
          <div />
          <HashLink 
            to={`/#${item}`}
          >
            {item}
          </HashLink>
        </li>
        )}
      </ul>
      <HamburgerMenu setToggle={setToggle} toggle={toggle} sections={sections}/>
    </nav>
  )
}

export default Navbar