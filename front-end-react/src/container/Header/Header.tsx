import React, {useEffect, useState} from 'react';
import {motion} from 'framer-motion';
// @ts-ignore
import FadeIn from '../../components/FadeIn.tsx';
import {images} from '../../constants';
import './Header.scss';
// @ts-ignore
import {AppWrap} from '../../wrapper/index.ts'

const GAME_DEVELOPER_TITLE : string = "Game Developer";
const GAMEPLAY_TITLE : string = "Gameplay Programmer";
const DELAY_BETWEEN_TITLE : number = 1.2;
const BAR_DELAY : number = 0.8;
const TYPING_DELAY : number = 0.1;
const AMOUNT_OF_BAR_LOOPS : number = 11;

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

function delay(seconds) {return new Promise(resolve => setTimeout(resolve, seconds * 1000));}

const Header : React.FC = () => {
  const [text, setText] = useState<string>(GAME_DEVELOPER_TITLE)

  const changeText = async (title : string) =>{
    let currentTitle : string = "";

    for (let i = 0; i < title.length; i++) {
      currentTitle += title[i];
      setText(currentTitle+"|");
      await delay(TYPING_DELAY)
    }

    for(let i = 0; i < AMOUNT_OF_BAR_LOOPS; i++){
      setText(currentTitle+(i%2 === 0 ? "|" : ""));
      await delay(BAR_DELAY)
    }
  }

  const clearText = async (title : string) =>{
    let currentTitle : string = title;
    for (let i = title.length; i >= 0; i--) {
      currentTitle = currentTitle.slice(0, i);
      setText(currentTitle+"|");
      await delay(TYPING_DELAY)
    }
  }

  const textLoop = async ()=>{
    await clearText(text);
    await delay(DELAY_BETWEEN_TITLE/2);
    await changeText(GAMEPLAY_TITLE);
    await delay(DELAY_BETWEEN_TITLE);
    await clearText(text);
    await delay(DELAY_BETWEEN_TITLE/2);
    await changeText(GAME_DEVELOPER_TITLE);
    await delay(DELAY_BETWEEN_TITLE);
    textLoop();
  }

  useEffect(()=>{
    setTimeout(textLoop, 2000)
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
                      <span>👋</span>
                      <div style={{marginLeft: 20}}>
                        <p className="p-text">Hi there, I am</p>
                        <h1 className="head-text"><span>Vasco</span></h1>
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
                {techStack.map((circle, index) =>
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

export default Header