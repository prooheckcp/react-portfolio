import React, {useEffect, useState} from 'react'
import ReactPlayer from 'react-player';
import {useParams} from 'react-router-dom';
import './WorkPage.scss';
//@ts-ignore
import SkillContainer from '../components/SkillsContainer.tsx';
//@ts-ignore
import FetchSanityData from '../functions/FetchSanityData.ts';
import {client} from '../client';

const TECH = ["React"];

const nigga = {}
nigga.level = 5
nigga.title = "UwU"
nigga.name = "amogus"
nigga.icon = "";

const WorkPage = () => {
  const {workIndex} = useParams();
  const [skills, setSkills] = useState([]);
  const [skillsMap, setSkillsMap] = useState<Map<any, any> | null>(null);
  const [usedTech, setUsedTech] = useState<Array<any>>([]);
  const [usedLanguages, setUsedLanguages] = useState<Array<any>>([]);

  useEffect(()=>{
    FetchSanityData("skills", setSkills);
  }, []);

  useEffect(()=>{
    let newMap = new Map();
    console.log(skills)
    for(let index = 0; index < skills.length; index++){
      let skill = skills[index];
      
      if(!skill?.name)
        return;

      newMap.set(skill.name, skill);
      setSkillsMap(newMap);
    }
  }, [skills]);

  useEffect(()=>{
    if(!skillsMap)
      return;

    setUsedLanguages([skillsMap.get('Lua')]);
    setUsedTech([skillsMap.get('React'), skillsMap.get('React')]);
  }, [skillsMap])

  return (
    <>
      <div className="background">
        <div className="navbar-gap"/>
        <div className="project-info">
          <h1>
            Project Title
          </h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore magni minima quo fugit illo amet nulla asperiores dolorem sunt nostrum!
          </p>
        </div>

        <div>
          <div>

          </div>
          <div>
            <div>
              <SkillContainer skillArray={usedTech} showCircle={false} toolTip={"name"}/>
            </div>
          </div>
        </div>

        <div className="video-wrapper">
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=BUd3V0D5d_E}`}
            className="react-player"
            controls
          />        
        </div>
        <div>
          <div>

          </div>
        </div>        
      </div>
    </>

  )
}

export default WorkPage