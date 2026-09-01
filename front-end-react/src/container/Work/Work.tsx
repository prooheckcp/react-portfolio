import React, {useEffect, useState} from 'react';
import {motion} from 'framer-motion';

// @ts-ignore
import WorkCard from './WorkCard.tsx';

// @ts-ignore
import {AppWrap, MotionWrap} from '../../wrapper/index.ts'
import './Work.scss';

// @ts-ignore
import FetchSanityData from '../../functions/FetchSanityData.ts';
// @ts-ignore
import {byFinalDateDesc} from '../../functions/workStatus.ts';
// @ts-ignore
import {parseGithubRepo, useGithubStars} from '../../functions/githubStars.ts';
import {BsFillTagsFill} from 'react-icons/bs';
import {
  FaGamepad,
  FaMagic,
  FaAppStoreIos,
  FaFlask
} from 'react-icons/fa';
import { CgWebsite } from "react-icons/cg";
import {IoLibrary } from 'react-icons/io5';
import { FaThList } from "react-icons/fa";

const ProjectTypes = new Map([
  ["Game", <FaGamepad style={{ fontSize: '18px' }}/>],
  ["Website", <CgWebsite style={{ fontSize: '18px' }}/>],
  ["Library", <IoLibrary style={{ fontSize: '18px' }}/>],
  ["App", <FaAppStoreIos style={{ fontSize: '18px' }}/>],
  ["TechDemo", <FaMagic style={{ fontSize: '18px' }}/>],
  ["Research", <FaFlask style={{ fontSize: '18px' }}/>],
  ["All", <FaThList style={{ fontSize: '18px' }}/>],
]);


const Work : React.FC = () => {
  const [sections, setSections] = useState([])
  const [currentTags, setCurrentTags] = useState([])
  const [tags, setTags] = useState(new Map([]))
  const [currentSection, setCurrentSection] = useState("All")
  const [selectedTags, setSelectedTags] = useState([])
  const [animateCard, setanimateCard] = useState<any>({y: 0, opacity: 1});
  const [works, setWorks] = useState([]);
  const [skills, setSkills] = useState([]);
  const [filterWork, setFilterWork] = useState([]);

  // One hook for the whole grid rather than one per card: the repos are known
  // as soon as the works land, and this way the fetches are deduped up front.
  const stars = useGithubStars(
    works.map((work : any)=> parseGithubRepo(work.codeLink)).filter(Boolean)
  );

  function updateFilter(){
    setFilterWork(works.filter((work)=>{
      let exitFlag = true;

      selectedTags.forEach((tag: any)=>{
        if(!work.tags){
          exitFlag = false;
          return
        }


        if(work?.tags?.includes(tag) == false){
          exitFlag = false;
          return
        }        
      })

      return  exitFlag &&(
              currentSection == "All" || 
              currentSection == work.projectType)
    }))
  }

  function updateTags(){
    setCurrentTags(tags.get(currentSection) ?? [])
  }

  function selectedTag(tag: string) {
    setSelectedTags(prevTags => {
        if (prevTags.includes(tag)) {
            // Remove the tag if it already exists
            return prevTags.filter(item => item !== tag);
        } else {
            // Add the tag if it doesn't exist
            return [...prevTags, tag];
        }
    });
}

  useEffect(()=>{
    // Sanity returns documents in no guaranteed order, so ordering happens
    // here once - `updateFilter` only ever narrows this list, never reorders it.
    FetchSanityData("works", (data : Array<any>)=>{
      const ordered = [...data].sort(byFinalDateDesc);
      setWorks(ordered);
      setFilterWork(ordered);
    });
    FetchSanityData("skills", setSkills);
  }, [])

  useEffect(()=>{
    let newSections = ["All"];
    let newTags = new Map([
      ["All", []]
    ]);

    works.forEach((value: any)=>{
      if (!newSections.includes(value.projectType))
        newSections.push(value.projectType);

      if(!newTags.has(value.projectType))
        newTags.set(value.projectType, []);

      if(value.tags){
        value.tags.forEach((tag: any)=>{
          let allArray = newTags.get("All")
          let sectionArray = newTags.get(value.projectType)

          if(!allArray.includes(tag))
            allArray.push(tag)

          if(!sectionArray.includes(tag))
            sectionArray.push(tag)
        })
      }
    })

    setSections(newSections);
    setTags(newTags);
    updateFilter();
    updateTags();
  }, [works])

  useEffect(()=>{
    updateTags()
  }, [tags])

  useEffect(()=>{
    updateFilter();
    updateTags();
    setSelectedTags([]);
  }, [currentSection])

  useEffect(()=>{
    updateFilter();
  }, [selectedTags])

  return (
    <>
      <h2 className="head-text" style={{ marginBottom: "2rem" }}>
        My Amazing <span>Portfolio</span>
      </h2>

      <div className="app__work-filter">
        {sections.map((item ,index) =>
          <div
            key={index}
            onClick={()=> {
              setCurrentSection(item);
            }}
            className={`app__work-filter-item app__flex p-text ${currentSection === item ? 'item-active' : ''}`}
          >
            
            <p style={{ fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              {ProjectTypes.get(item) ?? <BsFillTagsFill style={{ fontSize: '18px' }} />}
              <em style={{ fontStyle: 'normal' }}>{item}</em>
            </p>
          </div>
        )}
      </div>

      <div className="app__work-filter" style={{ marginTop: "0.75rem" }}>
        {currentTags.map((item ,index) =>
        {
          return <div
            key={index}
            onClick={()=> {
              selectedTag(item);
            }}
            className={`app__work-filter-item app__flex p-text ${selectedTags.includes(item) ? 'item-active' : ''}`}
          >
            
            <p style={{ fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <BsFillTagsFill/>{item}
            </p>
          </div>}
        )}
      </div>

      <motion.div
        animate={animateCard}
        transition={{duration: 0.5, delayChildren: 0.5}}
        className="app__work-portfolio"
      >
        {filterWork.map((work, index)=>
          <WorkCard
            key={`${work.id}-${index}`}
            stars={stars.get(parseGithubRepo(work.codeLink))}
            {...work}
          />
        )}
      </motion.div>
    </>
  )
}

export default AppWrap(MotionWrap(Work, "app__works"), "work", "app__works app__background")