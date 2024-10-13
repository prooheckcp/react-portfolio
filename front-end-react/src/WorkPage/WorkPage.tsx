import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom';
import './WorkPage.scss';
import {motion} from 'framer-motion';
import {urlFor, client} from '../client';
//@ts-ignore
import ButtonsSection from './ButtonsSection.tsx';
//@ts-ignore
import Header from './Header.tsx';
//@ts-ignore
import Video from './Video.tsx';
//@ts-ignore
import SkillsContainers from './SkillsContainers.tsx';
//@ts-ignore
import PicturesWrapper from './PicturesWrapper.tsx';
//@ts-ignore
import DetailBoxes from './DetailBoxes.tsx';

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

    if(currentProject.tech)
      for(let index = 0; index < currentProject.tech.length; index++){
        const currentTech = currentProject.tech[index];
        const name : string = currentTech?.trim();

        if(skillsMap?.has(name))
          techUsed.push(skillsMap?.get(name));
      }      
    

    if(currentProject.languages)
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

  let {description, title, trailerLink, codeLink, projectLink, startingDate, finalDate, projectType, multiplayer, imgUrl, images, tags} = currentWork;

  console.log("Current work: ", currentWork)

  title = title || "N/A";
  description = description || "N/A";
  images = images || [];

  return (
    <>
      <div className="background">
      <div className="navbar-gap"/>  
        <Header title={title} description={description} imgUrl={imgUrl} tags={tags}/>
        <Video trailerLink={trailerLink} title={title}/>
        <SkillsContainers usedLanguages={usedLanguages || []} usedTech={usedTech || []} className="skills-container"/>
        <DetailBoxes projectType={projectType} startingDate={startingDate} finalDate={finalDate} multiplayer={multiplayer}/>
        <ButtonsSection codeLink={codeLink} projectLink={projectLink}/>                 
        <PicturesWrapper title={title} images={images}/>
      </div>
    </>

  )
}

export default WorkPage