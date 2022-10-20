import React from 'react'
import {motion} from 'framer-motion';
//@ts-ignore
import Skill from '../interfaces/Skill.ts';
//@ts-ignore
import SkillCircle from './SkillCircle.tsx';

const SkillsContainer = ({skillArray, className, showCircle, toolTip, circleClassName}) => {

  return (
    <>
        <motion.div 
          whileInView={{opacity:[0, 1]}} 
          transition={{duration: 0.5}}
          className={`app__skills-list ${className}`
        }>
            {React.Children.toArray(skillArray.map((skill : Skill)=>
                <SkillCircle skill={skill} showCircle={showCircle} toolTip={toolTip} circleClassName={circleClassName}/>
            ))}
        </motion.div>
    </>
  )
}

export default SkillsContainer