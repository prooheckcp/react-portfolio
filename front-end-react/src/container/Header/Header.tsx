import React, {useEffect, useState, useRef} from 'react';
import {motion, useInView, useReducedMotion} from 'framer-motion';
import {FaTrophy, FaFileAlt} from 'react-icons/fa';
import {SiRoblox} from 'react-icons/si';

import './Header.scss';

/*@ts-ignore*/
import FadeIn from '../../components/FadeIn.tsx';
/*@ts-ignore*/
import {AppWrap} from '../../wrapper/index.ts'

import {Link} from 'react-router-dom';

import {images} from '../../constants';
import robloxVisits from '../../constants/robloxVisits.json';
import TypingEffect from '../../functions/Typing.ts';
// @ts-ignore
import FetchSanityData from '../../functions/FetchSanityData.ts';

const MAIN_EMOJI : string = "👋";
const DEV_NAME : string = "Vasco";
const WELCOMING_MESSAGE : string = "Hi there, I am";
const TITLE_LIST : Array<string> = ["Machine Learning Researcher", "Software Engineer", "Game Developer"];

/* Seconds after the bubble mounts. The bubbles scale in over 1s
   (scaleVariants); by 0.4s they are large enough to read, so the count runs
   alongside the tail of that animation instead of waiting it out. */
const COUNT_UP_DELAY : number = 0.4;
const COUNT_UP_DURATION_MS : number = 2200;

type Stat = {value: string, label: string, to: string, icon: React.ReactNode};

/* Counts the leading number of a stat up from zero the first time it scrolls
   into view, keeping its suffix ("4.2B+" counts 0.0 -> 4.2 with "B+" fixed).
   Values that do not start with a number ("ICEC 2026") render as-is, as does
   everything for visitors who ask for reduced motion. */
const CountUp = ({value, delay = 0} : {value: string, delay?: number}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, {once: true});
  const prefersReducedMotion = useReducedMotion();
  const parts = /^(\d+(?:\.(\d+))?)(.*)$/.exec(value);
  const zero = parts ? `${(0).toFixed(parts[2]?.length ?? 0)}${parts[3]}` : value;
  const [shown, setShown] = useState<string>(prefersReducedMotion ? value : zero);

  useEffect(() => {
    if(!parts || prefersReducedMotion){
      setShown(value);
      return;
    }

    if(!isInView)
      return;

    /* A plain rAF loop: framer-motion 7's `animate()` silently never starts
       when given a `delay`, leaving the stat stuck at zero. */
    const [, number, decimals, suffix] = parts;
    const target = Number(number);
    const startAt = performance.now() + delay * 1000;
    let frame = 0;

    const tick = (now : number) => {
      const progress = Math.min(Math.max((now - startAt) / COUNT_UP_DURATION_MS, 0), 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      setShown(`${(target * eased).toFixed(decimals?.length ?? 0)}${suffix}`);

      if(progress < 1)
        frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(frame);
  // `parts` is derived from `value`, so `value` alone covers it.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, delay, isInView, prefersReducedMotion]);

  return <span ref={ref}>{shown}</span>;
}

/* 4,280,869,452 -> "4.2B+". Rounds down so the "+" is always true. */
const formatCompact = (value : number) : string => {
  const units : Array<[number, string]> = [[1e9, 'B'], [1e6, 'M'], [1e3, 'K']];

  for(const [size, suffix] of units)
    if(value >= size)
      return `${Math.floor(value / size * 10) / 10}${suffix}+`;

  return String(value);
}

/* A single paper reads as a weak "1" next to billions, so until there are
   more it is shown as a credential (the venue) rather than a count. */
const paperStat = (papers : Array<any>) : Stat | null => {
  if(papers.length === 0)
    return null;

  if(papers.length > 1)
    return {value: String(papers.length), label: 'Research papers', to: '/research', icon: <FaFileAlt />};

  const [paper] = papers;
  const venue = (paper.venue ?? '').replace(/\s*\(.*\)\s*$/, '').replace(/^IFIP\s+/, '');

  return {value: venue || '1', label: paper.isFirstAuthor ? 'First-author paper' : 'Research paper', to: '/research', icon: <FaFileAlt />};
}

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
  const hasMounted = useRef(false);
  const [awardsWon, setAwardsWon] = useState<number>(0);
  const [papers, setPapers] = useState<Array<any>>([]);

  useEffect(()=>{
    if (hasMounted.current)
      return;

    TypingEffect(TITLE_LIST, text, setText);
    FetchSanityData("awards", (data) => setAwardsWon(data.filter((award) => award.result === 'Won').length));
    FetchSanityData("researchPapers", setPapers);
    hasMounted.current = true;
  }, [])

  /* Largest first: the first bubble is the big one in the layout. Stats that
     have not loaded (or are zero) are left out rather than shown as 0. */
  const stats : Array<Stat> = [
    robloxVisits.visits > 0 ? {value: formatCompact(robloxVisits.visits), label: 'Roblox visits', to: '/work', icon: <SiRoblox />} : null,
    awardsWon > 0 ? {value: String(awardsWon), label: awardsWon === 1 ? 'Award won' : 'Awards won', to: '/credentials', icon: <FaTrophy />} : null,
    paperStat(papers),
  ].filter(Boolean);

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
                {stats.map((stat, index) =>
                  <motion.div
                  className="circle-cmp app__flex"
                  key={stat.label}
                  animate={{
                    scale: [1, 1.06, 1],
                    y:[0, -15, 0],
                  }}
                  transition={{repeat: Infinity, repeatDelay: 1, ease: "linear", duration:5, delay: index * 0.6}}
                  >
                    <Link to={stat.to} className="circle-cmp__stat">
                      <span className="circle-cmp__icon" aria-hidden="true">{stat.icon}</span>
                      <span className={`circle-cmp__value${stat.value.length > 5 ? ' circle-cmp__value--long' : ''}`}><CountUp value={stat.value} delay={COUNT_UP_DELAY + index * 0.15} /></span>
                      <span className="circle-cmp__label">{stat.label}</span>
                    </Link>
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