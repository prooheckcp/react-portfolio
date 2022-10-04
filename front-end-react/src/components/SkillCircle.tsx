import React from 'react'
import {motion} from 'framer-motion';
import ReactTooltip from 'react-tooltip';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
//@ts-ignore
import Skill from '../interfaces/Skill.ts';
import {urlFor } from '../client';

const CONFIDENCE_LEVEL : Array<string> = [
    "Bad",
    "Okay",
    "Good",
    "Very Good",
    "Fluent"
]
const CIRCLE_COLOR : any = {
    x : 236,
    y : 180,
    z : 101
}
  
const lerp = (x, y, a) => x * (1 - a) + y * a;

const SkillCircle = (props) => {
  const skill : Skill = props.skill;
  const showCircle : any = props.showCircle;
  const toolTip : any = props.toolTip != "name" ? `${CONFIDENCE_LEVEL[skill?.level-1]} ${skill?.level}/5` : skill.name;
  
  return (
    <>
        <motion.div
          whileInView={{opacity: [0, 1]}}
          transition={{duration: 0.5}}
          className="app__skills-item app__flex"
        >
          <ReactTooltip className="skills-tooltip" />
          <div className="app__flex" style={{ backgroundColor: skill?.bgColor}}>
            <img src={skill?.icon ? urlFor(skill?.icon) : ''} alt={skill?.name} />
            <div data-tip={toolTip} className="app__circular_progress">
              {
                showCircle == undefined || showCircle == true ? 
                <CircularProgressbar 
                value={skill?.level * 20} 
                styles={buildStyles({
                  // How long animation takes to go from one percentage to another, in seconds
                  pathTransitionDuration: 0.5,

                  pathColor: `rgba(${lerp(0, CIRCLE_COLOR.x, skill?.level/5)}, ${lerp(0, CIRCLE_COLOR.y, skill?.level/5)}, ${lerp(0, CIRCLE_COLOR.z, skill?.level/5)}, 1)`,
                  trailColor: 'rgba(0, 0, 0, 0.2)',
                  strokeLinecap: 'butt'
                })}
                />                  
                :
                ''
              }

            </div>
            
          </div>
          <p className="p-text">{skill?.name}</p>
        </motion.div>
    </>
  )
}

export default SkillCircle