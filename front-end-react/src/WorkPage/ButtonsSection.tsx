import React from 'react'
import {motion} from 'framer-motion';
import {GiConsoleController} from 'react-icons/gi'
import {BsGithub} from 'react-icons/bs'

const ButtonsSection = ({codeLink, projectLink}) => {
  return (
    <div className="buttonsContainers">
    {
      codeLink ?
      <a href={codeLink} target="_blank">
          <motion.div className="button-item" whileHover={{scale: 1.1, transition: 0.2}}>
            <p><BsGithub/></p>
          </motion.div>            
      </a>
      : null
    }
    {
      projectLink ?
      <a href={projectLink} target="_blank">
          <motion.div className="button-item" whileHover={{scale: 1.1, transition: 0.2}}>
          <p><GiConsoleController/></p>
          </motion.div>            
      </a>
      : null
    }
  </div>
  )
}

export default ButtonsSection