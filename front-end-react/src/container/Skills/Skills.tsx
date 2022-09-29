import './Skills.scss';
import React, {useEffect, useState} from 'react';
import {motion} from 'framer-motion';
import {client, urlFor } from '../../client';
//@ts-ignore
import WorkExperience from '../../interfaces/WorkExperience.ts';
// @ts-ignore
import {AppWrap, MotionWrap} from '../../wrapper/index.ts'
// @ts-ignore
import Skill from '../../interfaces/Skill.ts';
// @ts-ignore
import getFormatedDateLength from '../../functions/getFormatedDateLength.ts';
// @ts-ignore
import FetchSanityData from '../../functions/FetchSanityData.ts';

import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import ReactTooltip from 'react-tooltip';

const GET_TITLE : Map<string, string> = new Map<string, string>([
  ["language", "Programming Languages"],
  ["tech", "Tech Stack"],
  ["tool", "Tools"]
]);

const SKILLS : Map<string , Array<Skill>> = new Map<string, Array<Skill>>([
  ["language", []],
  ["tech", []],
  ["tool", []]
]);

const CIRCLE_COLOR : any = {
  x : 236,
  y : 180,
  z : 101
}

const CONFIDENCE_LEVEL : Array<string> = [
  "Bad",
  "Okay",
  "Good",
  "Very Good",
  "Fluent"
]

function getFormatedTools(toolsUsed?: Array<string>){
  if(!toolsUsed)
    return "";

  let result : string = "Tools used: ";
  for(let index : number = 0; index < toolsUsed.length; index++){
    if(index > 0)
      result += " · "

    result += toolsUsed[index]
  }

  return result;
}

const lerp = (x, y, a) => x * (1 - a) + y * a;

function getSkill(skill : Skill) : JSX.Element {
  return (
    <>
        <motion.div
          whileInView={{opacity: [0, 1]}}
          transition={{duration: 0.5}}
          className="app__skills-item app__flex"
        >
          <ReactTooltip className="skills-tooltip" />
          <div className="app__flex" style={{ backgroundColor: skill.bgColor}}>
            <img src={urlFor(skill.icon)} alt={skill.name} />
            <div data-tip={`${CONFIDENCE_LEVEL[skill.level-1]} ${skill.level}/5`} className="app__circular_progress">
              <CircularProgressbar 
              value={skill.level * 20} 
              styles={buildStyles({
                // How long animation takes to go from one percentage to another, in seconds
                pathTransitionDuration: 0.5,

                pathColor: `rgba(${lerp(0, CIRCLE_COLOR.x, skill.level/5)}, ${lerp(0, CIRCLE_COLOR.y, skill.level/5)}, ${lerp(0, CIRCLE_COLOR.z, skill.level/5)}, 1)`,
                trailColor: 'rgba(0, 0, 0, 0.2)',
                strokeLinecap: 'butt'
              })}
              />
            </div>
            
          </div>
          <p className="p-text">{skill.name}</p>
        </motion.div>
    </>
  )
}

function parseCodeBlock(skills : Map<string , Array<Skill>>){
  let titles : Array<string> = [];
  let skillsArray : Array<Array<Skill>> = [];
  skills.forEach((value : Skill, key : string)=>{
    titles.push(key);
    skillsArray.push(value);
  })

  return(
    <>
      {
        React.Children.toArray(skillsArray.map((skillArray : Array<Skill>, index : number)=>
          <>
            {skillArray.length > 0 ?
              <>
                <h2>{GET_TITLE.get(titles[index])}</h2>
                <motion.div className="app__skills-list">
                  {React.Children.toArray(skillArray.map((skill : Skill)=>
                    getSkill(skill)
                  ))}
                </motion.div>

              </>
               :
              ''
            }
            
          </>
        ))
      }
    </>
  )
}

function parseSkillsData(data : Array<Skill>){
  const newSkills : Map<string , Array<Skill>> = new Map<string, Array<Skill>>([
    ["language", []],
    ["tech", []],
    ["tool", []]
  ]);
  
  for(let index : number = 0; index < data.length; index++){
    let skill : Skill = data[index];
    newSkills.get(skill.section)?.push(skill);
  }

  newSkills.forEach((skillSet)=>{
    skillSet?.sort((skill1, skill2)=>{
      return skill1.level > skill2.level ? - 1 : 1;
    })
  })

  return newSkills;
}

const Skills : React.FC = () => {
  const [experience, setExperience] = useState([]);
  const [skills, setSkills] = useState<Map<string , Array<Skill>>>(SKILLS);

  useEffect(()=>{
    const skillsQuery = '*[_type == "skills"]';

    FetchSanityData("workExperience", setExperience)

    client.fetch(skillsQuery).then(data=>{
      setSkills(parseSkillsData(data));
    });
  }, [])

  return (
    <>
      <h2 className="head-text">Skills & <span>Experience</span></h2>

      <div className="app__skills-container">
        <div className="app__skills-list-container">
          {parseCodeBlock(skills)}
        </div>


        <motion.div
          className="app__skills-exp"
        >
          {React.Children.toArray(experience?.map((workExperience : WorkExperience)=>
            <>
              <motion.div
                className="app__skills-exp-item"
              >
                <div className="app__skills_left_container">
                  <img src={urlFor(workExperience.imgUrl)} alt="" />
                </div>
                <motion.div
                  className="app__skills_right_container"
                >
                      <motion.div
                        whileInView={{opacity: [0, 1]}}
                        transition={{duration: 0.5}}
                        className="app__skills-exp-work"
                      >
                        <h4 className="bold-text">{workExperience.name}</h4>
                        <p className="p-text company-text">{workExperience.company}</p>
                        <p className="p-text date-text">{getFormatedDateLength(workExperience.startingDate, workExperience.leaveDate)}</p>
                        <p className="p-text desc-text">{workExperience.desc}</p>
                        <p className="p-text tools-text">{getFormatedTools(workExperience.toolsUsed)}</p>
                      </motion.div>
                </motion.div>
              </motion.div>          
            </>
          ))}
        </motion.div>
      </div>
    </>
  )
}

export default AppWrap(MotionWrap(Skills, "app__skills"), "skills", "app__secondBackground app__skillsSize")