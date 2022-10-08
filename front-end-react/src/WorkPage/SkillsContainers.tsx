import React from 'react'
//@ts-ignore
import SkillContainer from '../components/SkillsContainer.tsx';
import {motion} from 'framer-motion';

const SkillsContainers = ({usedLanguages, usedTech}) => {
  return (
    <motion.div 
    whileInView={{opacity:[0, 1]}} 
    transition={{duration: 0.5}}
    className="skills_container">
      <div className="languages info-container">
        <h2>Languages used</h2>
        <SkillContainer className="container" skillArray={usedLanguages} showCircle={false} toolTip={"name"}/>
      </div>
      <div className="tech info-container">
        <h2>Tech used</h2>
          <SkillContainer skillArray={usedTech} showCircle={false} toolTip={"name"}/>
      </div>
  </motion.div>
  )
}

export default SkillsContainers