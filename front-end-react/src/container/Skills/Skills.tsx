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

const MONTH_LIST : Array<string> = ["January","February","March","April","May","June","July","August","September","October","November","December"];
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

function getFormatedDateLength(startingDate : string, finalDate? : string){
  let startDate : Date = new Date(startingDate);
  let endDate : Date;
  let startString : string = "";
  let finalString : string = "";
  let duration : string = "";

  startString = MONTH_LIST[startDate.getMonth()] + " of " + startDate.getFullYear();
  if(finalDate){
    endDate = new Date(finalDate);
    finalString = MONTH_LIST[endDate.getMonth()] + " of " + endDate.getFullYear();
  }else{
    endDate = new Date();
    finalString = "now";
  }

  let differenceInYears : number = endDate.getFullYear() - startDate.getFullYear();
  let differenceInMonths : number = endDate.getMonth() - startDate.getMonth();

  if(differenceInYears > 0){
    let prefix : string = "";
    if(differenceInYears > 1)
      prefix = "s";

    duration = differenceInYears.toString()  + " year" + prefix + " and ";
  }
  
  if(differenceInMonths <= 0)
    differenceInMonths = 1;

  duration += differenceInMonths.toString() + " months";

  return startString + " - " + finalString + " · " + duration;
}

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

const Skills : React.FC = () => {
  const [experience, setExperience] = useState([]);
  const [skills, setSkills] = useState<Array<WorkExperience>>([]);

  useEffect(()=>{
    const experiencesQuery = '*[_type == "workExperience"]';
    const skillsQuery = '*[_type == "skills"]';

    client.fetch(experiencesQuery).then(data=>{
      setExperience(data);
    });

    client.fetch(skillsQuery).then(data=>{
      setSkills(data);
    });
  }, [])

  return (
    <>
      <h2 className="head-text">Skills & Experience</h2>

      <div className="app__skills-container">
        <div className="app__skills-list-container">
          <h2 className="head-text">Programming Languages</h2>
          <motion.div className="app__skills-list">
            {skills?.map((skill)=>(
              <motion.div
                whileInView={{opacity: [0, 1]}}
                transition={{duration: 0.5}}
                className="app__skills-item app__flex"
                key={skill.name}
              >
                <div className="app__flex" style={{ backgroundColor: skill.bgColor}}>
                  <img src={urlFor(skill.icon)} alt={skill.name} />
                </div>
                <p className="p-text">{skill.name}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>


        <motion.div
          className="app__skills-exp"
        >
          {experience?.map((workExperience : WorkExperience)=>
            <>
              <motion.div
                className="app__skills-exp-item"
                key={workExperience.name}
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
                        data-tip
                        data-for={3}
                        key={3}
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
          )}
        </motion.div>
      </div>
    </>
  )
}

export default AppWrap(MotionWrap(Skills, "app__skills"), "skills", "app__secondBackground app__skillsSize")