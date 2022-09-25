import React, {useState, useEffect} from 'react';
import './About.scss';
import {motion} from 'framer-motion';
import {images} from '../../constants';

const abouts = [
  {title: 'Web Development', description: 'I am a good web developer.', imgUrl: images.about01},
  {title: 'Web Design', description: 'I am a good web developer.', imgUrl: images.about02},
  {title: 'UI/UX', description: 'I am a good web developer.', imgUrl: images.about03},
  {title: 'Web animations', description: 'I am a good web developer.', imgUrl: images.about04},
]

const About : React.FC = () => {
  return (
    <>
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
            <img src={about.imgUrl} alt={about.title} />
            <h2 className="bot-text" style={{marginTop:20}}>{about.title}</h2>
            <p className="p-text" style={{marginTop:10}}>{about.description}</p>
          </motion.div>
        )}
      </div>
    </>
  )
}

export default About