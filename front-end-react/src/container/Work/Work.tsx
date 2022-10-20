import React, {useEffect, useState} from 'react';
import {AiFillEye, AiFillGithub} from 'react-icons/ai';
import {motion} from 'framer-motion';
import {Link} from 'react-router-dom';

// @ts-ignore
import {AppWrap, MotionWrap} from '../../wrapper/index.ts'
import './Work.scss';
import { client, urlFor } from '../../client';

// @ts-ignore
import FetchSanityData from '../../functions/FetchSanityData.ts';

const SECTIONS : Array<string> = ['All', 'Web Development', 'Apps', 'Unity', 'Roblox', 'Unreal Engine'];

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
        setFilterWork(works.filter((work)=> work.tags.includes(item)))
      
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
            {item}
          </div>
        )}
      </div>

      <motion.div
        animate={animateCard}
        transition={{duration: 0.5, delayChildren: 0.5}}
        className="app__work-portfolio"
      >
        {filterWork.map((work, index)=>
          <div className="app__work-item app__flex" key={index}>
            <div className="app__work-img app__flex">
              <img src={urlFor(work.imgUrl)} alt={work.name} />
              <Link to={`/work/${work.id}`}>
                <motion.div
                  whileHover={{opacity:[0, 1]}}
                  transition={{duration: 0.25, easy: 'easeInOut', staggerChildren: 0.5}}
                  className="app__work-hover app__flex"
                >
                  <motion.div
                    whileInView={{scale: [0, 1]}}
                    whileHover={{scale:[1, 0.9]}}
                    transition={{duration: 0.25}}
                    className="app__flex"
                  >
                    <AiFillEye/>
                  </motion.div>
                </motion.div>              
              </Link>

            </div>

            <div className="app__work-content app__flex">
              <h4 className="bold-text">{work.title}</h4>
              <p className="p-text" style={{marginTop: 10}}>{work.headline}</p>

              <div className="app__work-tag app__flex">
                <p className="p-text">{work.tags[0]}</p>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </>
  )
}

export default AppWrap(MotionWrap(Work, "app__works"), "work", "app__works app__background")