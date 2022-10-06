import React, {useEffect, useState} from 'react'
import ReactPlayer from 'react-player';
import {useParams} from 'react-router-dom';
import './WorkPage.scss';
//@ts-ignore
import SkillContainer from '../components/SkillsContainer.tsx';
//@ts-ignore
import FetchSanityData from '../functions/FetchSanityData.ts';
import {client} from '../client';
//@ts-ignore
import PictureGallery from '../components/PictureGallery.tsx';

import {GiConsoleController} from 'react-icons/gi'

const SKILLS_QUERY : string = '*[_type == "skills"]'
const WORKS_QUERY : string = '*[_type == "works"]';

const WorkPage = () => {
  const {workIndex} = useParams();
  const [skillsMap, setSkillsMap] = useState<Map<any, any> | null>(null);
  const [usedTech, setUsedTech] = useState<Array<any>>([]);
  const [usedLanguages, setUsedLanguages] = useState<Array<any>>([]);
  const [currentWork, setCurrentWork] = useState(null);

  const setDataArrays = (currentProject) =>{
    let techUsed : Array<any> = [];
    let languagesUsed : Array<any> = [];

    for(let index = 0; index < currentProject.techs.length; index++){
      const currentTech = currentProject.techs[index];
      const name : string = currentTech?.trim();

      if(skillsMap?.has(name))
        techUsed.push(skillsMap?.get(name));
    }

    for(let index = 0; index < currentProject.languages.length; index++){
      const currentLanguage = currentProject.languages[index];
      const name : string = currentLanguage?.trim();

      if(skillsMap?.has(name))
        languagesUsed.push(skillsMap?.get(name));
    }
    setUsedTech(techUsed);
    setUsedLanguages(languagesUsed);
  }

  useEffect(()=>{
    client.fetch(SKILLS_QUERY).then(skills=>{
      let newMap = new Map();
      for(let index = 0; index < skills.length; index++){
        let skill = skills[index];
        
        if(!skill?.name)
          continue;
  
        newMap.set(skill.name, skill);
      }

      setSkillsMap(newMap);

      client.fetch(WORKS_QUERY).then(data=>{ 
        for(let index = 0; index < data.length; index++){
          const projectData = data[index]; 
    
          if(projectData.id == workIndex){
            setCurrentWork(projectData);
            break;
          }
        }
      });

    })
  }, []);

  useEffect(()=>{
    if(currentWork == null)
      return;

    setDataArrays(currentWork);
  }, [currentWork, skillsMap])

  if(!currentWork)
    return '404';

  const {description, title, trailerLink} = currentWork;

  return (
    <>
      <div className="background">
        <div className="navbar-gap"/>
        <div className="project-info">
          <h1>
            {title}
          </h1>
          <p>
            {description}
          </p>
        </div>

        <div className="buttonsContainers">
          <a href="">
            <div className="button-item">
              <p><GiConsoleController/></p>
            </div>            
          </a>
        </div>

        {
          trailerLink ?
          <>
            <div className="video-wrapper">
              <h1>Watch {title}'s <span>trailer</span> </h1>
              <ReactPlayer
                url={`${trailerLink}`}
                className="react-player"
                controls
              />        
            </div> 
          </>
          :
          ''
        }

        <div className="skills_container">
          <div className="languages info-container">
            <h2>Languages used</h2>
            <SkillContainer className="container" skillArray={usedLanguages} showCircle={false} toolTip={"name"}/>
          </div>
          <div className="tech info-container">
            <h2>Tech used</h2>
              <SkillContainer skillArray={usedTech} showCircle={false} toolTip={"name"}/>
          </div>
        </div>

        <div className="picture-wrapper">
          <h1>Watch the {title}'s <span>pictures</span> </h1>
          <div className="picture-gallery">
            <PictureGallery />
          </div>
        </div>        
      </div>
    </>

  )
}

export default WorkPage