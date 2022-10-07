import React, {useState} from 'react';
import {HiMenuAlt4, HiX} from 'react-icons/hi';
import {motion} from 'framer-motion'
import './Navbar.scss';
import {images} from '../../constants'
import { Link } from 'react-router-dom'; 
import { HashLink } from 'react-router-hash-link';

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

      <div className="app__navbar-menu">

        <HiMenuAlt4 onClick={()=>setToggle(true)} />
        {
          toggle && (
            <motion.div
              whileInView={{x: [300, 0]}}
              transition={{duration: 0.85, ease:'easeInOut'}}
            >
              <HiX onClick={()=> setToggle(false)}/>
              <ul>
                {sections.map(item =>
                    <li key={`item`}>
                      <a href={`#${item}`} onClick={()=> setToggle(false)}>{item}</a>
                    </li>
                  )}
              </ul> 
            </motion.div>
          )
        }
      </div>
    </nav>
  )
}

export default Navbar