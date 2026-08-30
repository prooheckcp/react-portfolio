import React from 'react';
import {HiMenuAlt4, HiX} from 'react-icons/hi';
import {motion} from 'framer-motion';
import {Link} from 'react-router-dom';
import {HashLink} from 'react-router-hash-link';

const HamburgerMenu = ({setToggle, toggle, items}) => {
  return (
    <div className="app__navbar-menu">
      <HiMenuAlt4 onClick={()=>setToggle(true)} />
      {toggle && (
        <motion.div
          whileInView={{y: [-300, 0]}}
          transition={{duration: 0.85, ease:'easeInOut'}}
        >
          <HiX onClick={()=> setToggle(false)}/>
          <ul>
            {items.map(item =>
              <li key={`menu-${item.label}`}>
                {item.kind === 'route'
                  ? <Link to={item.target} onClick={()=> setToggle(false)}>{item.label}</Link>
                  : <HashLink to={`/#${item.target}`} onClick={()=> setToggle(false)}>{item.label}</HashLink>
                }
              </li>
            )}
          </ul>
        </motion.div>
      )}
    </div>
  )
}

export default HamburgerMenu
