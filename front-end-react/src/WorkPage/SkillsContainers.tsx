import React from 'react'
//@ts-ignore
import SkillContainer from '../components/SkillsContainer.tsx';
import {motion} from 'framer-motion';

const SkillsContainers = ({usedLanguages, usedTech, className}) => {
  return (
    <div 
    className="skills_container">
      <motion.div 
      className={`languages info-container ${className}`}
      initial={{ scale: 0 }}
      whileInView={{scale:1}} 
      transition={{duration: 0.5}}
      >
        <h2>Languages used</h2>
        <SkillContainer className="container" skillArray={usedLanguages} showCircle={false} toolTip={"name"} circleClassName={"white-skill"}/>
      </motion.div>
      
      <motion.div 
      className={`tech info-container ${className}`}
      initial={{ scale: 0 }}
      whileInView={{scale:1}} 
      transition={{duration: 0.5}}
      >
        <h2>Tech used</h2>
          <SkillContainer skillArray={usedTech} showCircle={false} toolTip={"name"} circleClassName={"white-skill"}/>
      </motion.div>
  </div>
  )
}

export default SkillsContainers