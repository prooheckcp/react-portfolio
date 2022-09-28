import './Skills.scss';
import React, {useEffect, useState} from 'react';
import ReactToolTip from 'react-tooltip';
import {motion, MotionConfig} from 'framer-motion';
import {client, urlFor } from '../../client';
//@ts-ignore
import WorkExperience from '../../interfaces/WorkExperience.ts';

// @ts-ignore
import {AppWrap, MotionWrap} from '../../wrapper/index.ts'

const MONTH_LIST : Array<string> = ["January","February","March","April","May","June","July","August","September","October","November","December"];

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
                        <p className="p-text">{workExperience.company}</p>
                        <p className="p-text">{getFormatedDateLength(workExperience.startingDate, workExperience.leaveDate)}</p>
                        <p className="p-text">{"BIG CHUNGUS"}</p>
                      </motion.div>
                      <ReactToolTip
                        id={"fasgas"}
                        effect="solid"
                        arrowColor="#fff"
                        className="skills-tooltip"
                      >
                        {3}
                      </ReactToolTip>
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