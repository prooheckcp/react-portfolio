import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom';
import './WorkPage.scss';
import {client} from '../client';
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
//@ts-ignore
import {parseGithubRepo, useGithubStars} from '../functions/githubStars.ts';
//@ts-ignore
import NotFound from '../container/404/404.tsx';

const SKILLS_QUERY : string = '*[_type == "skills"]'
const WORKS_QUERY : string = '*[_type == "works"]';

const WorkPage = () => {
  const {workIndex} = useParams();
  const [skillsMap, setSkillsMap] = useState<Map<any, any> | null>(null);
  const [usedTech, setUsedTech] = useState<Array<any>>([]);
  const [usedLanguages, setUsedLanguages] = useState<Array<any>>([]);
  const [currentWork, setCurrentWork] = useState(null);
  // Separate from `currentWork` so "still loading" and "no such project" render differently.
  const [notFound, setNotFound] = useState(false);

  // Hooks cannot sit below the `!currentWork` early return, so this runs with an
  // empty list until the project arrives and then refetches for its repo.
  const repo = parseGithubRepo((currentWork as any)?.codeLink);
  const stars = useGithubStars(repo ? [repo] : []);

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
        const projectData = data.find(project => project.id === workIndex);

        if(projectData)
          setCurrentWork(projectData);
        else
          setNotFound(true);
      });

    })
  }, []);

  useEffect(()=>{
    if(currentWork == null)
      return;

    setDataArrays(currentWork);
  }, [currentWork, skillsMap])

  if(notFound)
    return <NotFound/>;

  // Blank while Sanity answers; the page fills in as soon as the project arrives.
  if(!currentWork)
    return <div className="project-page"/>;

  let {description, title, trailerLink, codeLink, projectLink, startingDate, finalDate, projectType, multiplayer, imgUrl, images, tags, projectContext} = currentWork;

  title = title || "N/A";
  description = description || "N/A";
  images = images || [];

  return (
    <div className="project-page">
      <Header title={title} description={description} imgUrl={imgUrl} tags={tags} finalDate={finalDate}/>

      <div className="project-body">
        <DetailBoxes projectContext={projectContext} projectType={projectType} startingDate={startingDate} finalDate={finalDate} multiplayer={multiplayer}/>

        <section className="project-section">
          <h2 className="project-section__title">About the <span>project</span></h2>
          <p className="project-description">{description}</p>
        </section>

        <SkillsContainers usedLanguages={usedLanguages || []} usedTech={usedTech || []}/>
        <ButtonsSection codeLink={codeLink} projectLink={projectLink} stars={stars.get(repo)}/>
        <Video trailerLink={trailerLink} title={title}/>
        <PicturesWrapper title={title} images={images}/>
      </div>
    </div>

  )
}

export default WorkPage