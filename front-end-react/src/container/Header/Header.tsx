import React, {useCallback} from 'react';
import {motion} from 'framer-motion';
// @ts-ignore
import FadeIn from '../../components/FadeIn.tsx';
import {images} from '../../constants';
import './Header.scss';

import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import particlesData from '../../constants/particlesData';

const scaleVariants = {
  whileInView:{
    scale:[0, 1],
    opacity:[0, 1],
    transition: {
      duration: 1,
      ease:'easeInOut'
    }
  }
}

const techStack = [images.roblox, images.unity, images.ue4];

const Header : React.FC = () => {
  const particlesInit = useCallback(async (engine) => {
    console.log(engine);
    // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    await loadFull(engine);
}, []);

const particlesLoaded = useCallback(async (container) => {
    await console.log(container);
}, []);

  return (
    <div id="home" className="app__header app__flex">
      <Particles 
        id="tsparticles"
            init={particlesInit}
            loaded={particlesLoaded}
            options = {particlesData}
        />

      <FadeIn 
      className={"app__header-info"}
      content={
        <>
            <div className="app__header-badge">
              <div className="badge-cmp app__flex">
                <span>👋</span>
                <div style={{marginLeft: 20}}>
                  <p className="p-text">Hello, I am</p>
                  <h1 className="head-text">Vasco</h1>
                </div>
              </div>

              <div className="tag-cmp app__flex">
                <p className="p-text">Game Developer</p>
                <p className="p-text">Gameplay programmer</p>
              </div>
            </div>        
        </>
      }>
      </FadeIn>

      <FadeIn 
      delayChildren={0.5}
      className={"app__header-img"}
      content={
        <>
          <img src={images.profile} alt="profile_bg" />
          <motion.img
            whileInView={{scale:[0, 1]}}
            transition={{duration:1, ease:'easeInOut'}}
            className="overlay_circle"
            src={images.circle}
            alt="profile_circle"
          />
        </>
      }>

      </FadeIn>

      <FadeIn
      variant={scaleVariants}
      whileInView={scaleVariants.whileInView}
      className="app__header-circles"
      content={
        <>
        <div>
          {techStack.map((circle, index) => 
            <div className="circle-cmp app__flex" key={`circle-${index}`}>
              <img src={circle} alt="circle" />
            </div>   
          )}          
        </div>

        </>
      }
      >

      </FadeIn>
    </div>
  )
}

export default Header