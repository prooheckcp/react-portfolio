import React from 'react';
import {IoCalendarNumber, IoPeople, IoPerson} from 'react-icons/io5';
import {FiClock} from 'react-icons/fi';
import {FaGamepad, FaMagic, FaAppStoreIos, FaBriefcase, FaGraduationCap, FaHeart, FaFlask} from 'react-icons/fa';
import {CgWebsite} from 'react-icons/cg';
import {IoLibrary} from 'react-icons/io5';
//@ts-ignore
import getFormatedDateLength from '../functions/getFormatedDateLength.ts';

const ProjectContext = new Map([
  ["Professional", <FaBriefcase />],
  ["Academic", <FaGraduationCap />],
  ["Personal", <FaHeart />],
]);

const ProjectTypes = new Map([
  ["Game", <FaGamepad />],
  ["Website", <CgWebsite />],
  ["Library", <IoLibrary />],
  ["App", <FaAppStoreIos />],
  ["TechDemo", <FaMagic />],
  ["Research", <FaFlask />],
]);

const Stat = ({icon, label, value}) => {
  if(!value)
    return null;

  return (
    <div className="project-stat">
      <span className="project-stat__icon">{icon}</span>
      <span className="project-stat__text">
        <span className="project-stat__label">{label}</span>
        <span className="project-stat__value">{value}</span>
      </span>
    </div>
  );
}

const DetailBoxes = ({projectContext, projectType, startingDate, finalDate, multiplayer}) => {
  const {start, final, duration} = getFormatedDateLength(startingDate, finalDate);

  return (
    <div className="project-stats">
      <Stat icon={<IoCalendarNumber />} label="Timeline" value={startingDate ? `${start} – ${final}` : null} />
      <Stat icon={<FiClock />} label="Duration" value={startingDate ? duration : null} />
      <Stat icon={ProjectContext.get(projectContext) ?? <FaBriefcase />} label="Context" value={projectContext} />
      <Stat icon={ProjectTypes.get(projectType) ?? <FaGamepad />} label="Type" value={projectType} />
      {projectType === "Game" &&
        <Stat
          icon={multiplayer ? <IoPeople /> : <IoPerson />}
          label="Players"
          value={multiplayer ? "Multiplayer" : "Singleplayer"}
        />
      }
    </div>
  );
}

export default DetailBoxes;
