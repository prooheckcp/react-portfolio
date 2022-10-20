import React, {useEffect, useState} from 'react';
import {motion} from 'framer-motion';

// @ts-ignore
import WorkCard from './WorkCard.tsx';

// @ts-ignore
import {AppWrap, MotionWrap} from '../../wrapper/index.ts'
import './Work.scss';

// @ts-ignore
import FetchSanityData from '../../functions/FetchSanityData.ts';
import {BsFillTagsFill} from 'react-icons/bs';

const SECTIONS : Array<string> = ['All', 'Web', 'App', 'Unity', 'Roblox', 'Unreal Engine', '2D', '3D', 'Game', 'Multiplayer', 'SinglePlayer'];

const Work : React.FC = () => {
  const [activeFilter, setActiveFilter] = useState(SECTIONS[0]);
  const [animateCard, setanimateCard] = useState<any>({y: 0, opacity: 1});
  const [works, setWorks] = useState([]);
  const [filterWork, setFilterWork] = useState([]);

  useEffect(()=>{
    FetchSanityData("works", setWorks, setFilterWork)
  }, [])

  const handleWorkFilter = (item) =>{
    setActiveFilter(item);
    setanimateCard([{y: 100, opacity: 0}]);

    setTimeout(() => {
      setanimateCard([{y: 0, opacity: 1}]);

      if(item === 'All')
        setFilterWork(works);
      else
        setFilterWork(works.filter((work)=> 
          work.tags.includes(item) || 
          (item == "Unreal Engine" && work.techs?.includes("Unreal Engine")) ||
          (item == "Unity" && work.techs?.includes("Unity")) ||
          (item == "Roblox" && work.techs?.includes("Roblox Studio")) ||
          (item == "Multiplayer" && work.multiplayer) ||
          (item == "SinglePlayer" && !work.multiplayer)
        ))
      
    }, 400);
  }

  return (
    <>
      <h2 className="head-text">
        My Amazing <span>Portfolio</span>
      </h2>

      <div className="app__work-filter">
        {SECTIONS.map((item ,index) =>
          <div
            key={index}
            onClick={()=> handleWorkFilter(item)}
            className={`app__work-filter-item app__flex p-text ${activeFilter === item ? 'item-active' : ''}`}
          >
            <p>
              <BsFillTagsFill/> {item}
            </p>    
          </div>
        )}
      </div>

      <motion.div
        animate={animateCard}
        transition={{duration: 0.5, delayChildren: 0.5}}
        className="app__work-portfolio"
      >
        {React.Children.toArray(filterWork.map((work, index)=>
          WorkCard(work, index)
        ))}
      </motion.div>
    </>
  )
}

export default AppWrap(MotionWrap(Work, "app__works"), "work", "app__works app__background")