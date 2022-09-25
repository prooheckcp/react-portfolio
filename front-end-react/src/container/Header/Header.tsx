import React from 'react';
import {motion} from 'framer-motion';
// @ts-ignore
import FadeIn from '../../components/FadeIn.tsx';
import {images} from '../../constants';
import './Header.scss';

const techStack = [images.roblox, images.unity, images.ue4];

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

const Header : React.FC = () => {
  return (
    <>
      <div id="home" className="app__header app__flex">
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
    </>
    
  )
}

export default Header