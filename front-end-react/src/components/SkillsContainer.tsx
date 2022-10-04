import React from 'react'
import {motion} from 'framer-motion';
//@ts-ignore
import Skill from '../interfaces/Skill.ts';
//@ts-ignore
import SkillCircle from './SkillCircle.tsx';
import Skills from '../container/Skills/Skills';

const SkillsContainer = ({skillArray, className}) => {
  console.log("Here!", skillArray)
  return (
    <>
        <motion.div className={`app__skills-list ${className}`}>
            {React.Children.toArray(skillArray.map((skill : Skill)=>
                <SkillCircle skill={skill}/>
            ))}
        </motion.div>
    </>
  )
}

export default SkillsContainer