import React from 'react';
import {Link} from 'react-router-dom';
import {motion} from 'framer-motion';
import {IoArrowForward} from 'react-icons/io5';
import {FaLaptopCode, FaPaperPlane} from 'react-icons/fa';

// @ts-ignore
import {AppWrap, MotionWrap} from '../../wrapper/index.ts';
import './QuickLinks.scss';

const LINKS = [
  {
    key: 'work',
    to: '/work',
    icon: <FaLaptopCode />,
    title: 'See my work',
    copy: 'Games, tools and libraries I have built — with the story behind each one.',
    cta: 'Browse projects',
    primary: true,
  },
  {
    key: 'contact',
    to: '/contact',
    icon: <FaPaperPlane />,
    title: 'Get in touch',
    copy: 'Email, WhatsApp or Discord — whichever is easiest for you.',
    cta: 'Say hello',
    primary: false,
  },
];

const QuickLinks : React.FC = () => (
  <>
    <h2 className="head-text">Where to <span>next?</span></h2>

    <div className="quick-links">
      {LINKS.map((link, index) =>
        <motion.div
          key={link.key}
          initial={{opacity: 0, y: 16}}
          whileInView={{opacity: 1, y: 0}}
          viewport={{once: true, amount: 0.3}}
          transition={{duration: 0.35, delay: index * 0.08, ease: [0.2, 0.8, 0.2, 1]}}
        >
          <Link
            to={link.to}
            className={`quick-link ${link.primary ? 'quick-link--primary' : ''}`}
          >
            <span className="quick-link__icon">{link.icon}</span>

            <span className="quick-link__body">
              <span className="quick-link__title">{link.title}</span>
              <span className="quick-link__copy">{link.copy}</span>
            </span>

            <span className="quick-link__cta">
              {link.cta} <IoArrowForward />
            </span>
          </Link>
        </motion.div>
      )}
    </div>
  </>
);

export default AppWrap(
  MotionWrap(QuickLinks, "app__quicklinks"),
  "next",
  "app__secondBackground app__quicklinksSize"
);
