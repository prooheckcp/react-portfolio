import React from 'react';
import {motion} from 'framer-motion';
import {Link} from 'react-router-dom';
import {AiFillEye, AiFillGithub} from 'react-icons/ai';
import { client, urlFor } from '../../client';
import {BsFillTagsFill} from 'react-icons/bs';

export default ({name, id, imgUrl, title, headline, tags}, index) => {
    
    return(
        <>
        <div className="app__work-item app__flex">
            <div className="app__work-img app__flex">
              <img src={urlFor(imgUrl)} alt={name} />
              <Link to={`/work/${id}`}>
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
              <h4 className="bold-text">{title}</h4>
              <p className="p-text" style={{marginTop: 10}}>{headline}</p>

              <div className="app__work-tag app__flex">
                <p className="p-text"><BsFillTagsFill/> {tags[0] || "N/A"}</p>
              </div>
            </div>
          </div>
        </>
    )
}