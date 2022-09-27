import React, {useState, useEffect} from 'react';
import './About.scss';
import {motion} from 'framer-motion';
import {images} from '../../constants';
import {urlFor, client} from '../../client';
// @ts-ignore
import {AppWrap, MotionWrap} from '../../wrapper/index.ts'

const About : React.FC = () => {
  const [abouts, setAbouts] = useState([]);

  useEffect(()=>{
    const query = '*[_type == "abouts"]';
    client.fetch(query).then(data=>{ setAbouts(data);});
  }, [])

  return (
    <>
    <div className="app__about">
      <h2 className="head-text">
        A passionate
        <span className="green_text"> Portu</span><span className="red_text">guese </span><img className="emoji" src={images.portuguese} alt="PortugueseEmoji"/>
        <br/>
        
        <span>Game Developer</span>
      </h2>

      <div className="app__profiles">
        {abouts.map((about, index)=>
          <motion.div
            whileInView={{opacity: 1}}
            whileHover={{scale: 1.1}}
            transition={{duration: 0.5, type:'tween'}}
            className="app__profile-item"
            key={about.title + index}
          >
            <img src={urlFor(about.imgUrl)} alt={about.title} />
            <h2 className="bot-text" style={{marginTop:20}}>{about.title}</h2>
            <p className="p-text" style={{marginTop:10}}>{about.description}</p>
          </motion.div>
        )}
      </div>
    </div>

    </>
  )
}

export default AppWrap(About, "about")