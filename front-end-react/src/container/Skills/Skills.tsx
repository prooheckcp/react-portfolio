import './Skills.scss';
import React, {useEffect, useState} from 'react';
import ReactToolTip from 'react-tooltip';
import {motion} from 'framer-motion';
import { client, urlFor } from '../../client';

const Skills : React.FC = () => {
  const [experience, setExperience] = useState([]);
  const [skills, setSkills] = useState([]);

  useEffect(()=>{
    const experiencesQuery = '*[_type == "experiences"]';
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
          {skills.map((skill)=>(
            <motion.div
              whileInView={{opacity: [0, 1]}}
              transition={{duration: 0.5}}
              className="app__skills-item app__flex"
              key={skill.name}
            >

            </motion.div>
          ))}
        </motion.div>
      </div>
    </>
  )
}

export default Skills