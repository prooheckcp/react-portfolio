import React from 'react';
import {motion} from 'framer-motion';
import {Link} from 'react-router-dom';
import {AiFillEye} from 'react-icons/ai';
import {urlFor} from '../../client';
import {BsFillTagsFill} from 'react-icons/bs';
//@ts-ignore
import GetSkillIcon from '../../functions/GetSkillIcon.ts';
//@ts-ignore
import GetFormattedTags from '../../functions/GetFormattedTags.ts';

//{name, id, imgUrl, title, headline, tags, languages, techs}
export default (work) => {
    return(
      <>
        <div key={work.id}  className="app__work-item app__flex">
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
                <p className="p-text"><BsFillTagsFill/> {GetFormattedTags(work.tags ?? [])}</p>
              </div>


                {
                work.languages ?
                <div className="icons-container">
                    <div className="app__work-languages">                            
                        {
                            work.languages.map((value)=>{
                              let icon = GetSkillIcon("Programming Languages", value)?.icon

                              if(!icon)
                                return null;

                              return <img key={`languages${value}`} src={urlFor(icon)} alt="" />
                            })
                        }
                    </div>
                </div>
                :
                null
                }
                {
                work.tech ?
                <div className="icons-container-tech">
                    <div className="app__work-techs">
                        {
                            work.tech.map((value)=>{
                              let icon = GetSkillIcon("Tech", value)?.icon

                              if(!icon)
                                return null;

                                return <img key={`tech${value}`} src={urlFor(icon)} alt="" />
                            })
                        }
                    </div>
                </div>
                :
                null
                }
            </div>
          </div>
      </>
    )
}