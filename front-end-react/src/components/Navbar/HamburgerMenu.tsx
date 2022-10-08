import React from 'react'
import {HiMenuAlt4, HiX} from 'react-icons/hi';
import {motion} from 'framer-motion'

const HamburgerMenu = ({setToggle, toggle, sections}) => {
  return (
    <>
      <div className="app__navbar-menu">
        <HiMenuAlt4 onClick={()=>setToggle(true)} />
        {
          toggle && (
            <motion.div
              whileInView={{y: [-300, 0]}}
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
    </>
  )
}

export default HamburgerMenu