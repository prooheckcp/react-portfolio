import React, {useEffect, useState} from 'react';
import {motion} from 'framer-motion';

import './Header.scss';

/*@ts-ignore*/
import FadeIn from '../../components/FadeIn.tsx';
/*@ts-ignore*/
import {AppWrap} from '../../wrapper/index.ts'

import {images} from '../../constants';
import TypingEffect from '../../functions/Typing.ts';

const MAIN_EMOJI : string = "👋";
const DEV_NAME : string = "Vasco";
const WELCOMING_MESSAGE : string = "Hi there, I am";
const TITLE_LIST : Array<string> = ["Game Developer", "Gameplay Programmer", "UI Programmer"];
const TECH_STACK : Array<any> = [images.roblox, images.unity, images.ue4];

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
  const [text, setText] = useState<string>(TITLE_LIST[0])

  useEffect(()=>{
    TypingEffect(TITLE_LIST, text, setText);
  }, [])

  return (
    <>
      <div className="app__header app__flex">
        <FadeIn 
          className={"app__header-info"}
          content={
            <>
              <div className="app__header-badge">
                <div className="badge-cmp app__flex">
                  <span>{MAIN_EMOJI}</span>
                  <div style={{marginLeft: 20}}>
                    <p className="p-text">{WELCOMING_MESSAGE}</p>
                    <h1 className="head-text"><span>{DEV_NAME}</span></h1>
                  </div>
                </div>

                <div className="tag-cmp app__flex">
                  <p className="p-text">{text}</p>
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
              <img src={images.profile} alt="profile_bg" width = "800" height="800" 
              />
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
                {TECH_STACK.map((circle, index) =>
                  <motion.div 
                  className="circle-cmp app__flex" 
                  key={`circle-${index}`}
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 10, 0],
                    y:[0, -15, 0],
                  }}
                  transition={{repeat: Infinity, repeatDelay: 1, ease: "linear", duration:5}}
                  >
                    <motion.img 
                      src={circle}
                      alt="circle"
                      whileHover={{
                        scale: 1.15,
                        transition: {duration: 0.2},
                      }}
                    />
                  </motion.div>   
                )}
              </>
            }
            >
          </FadeIn>
        </div>        
    </> 
  )
}

export default AppWrap(Header, "home", "app__background")