import React from 'react'
import DetailBox from './DetailBox.tsx';
import {IoCalendarNumber, IoLibrary } from 'react-icons/io5';
import {FiClock} from 'react-icons/fi';
import {
  BsFillPersonFill, 
  BsBuilding, 
  BsFillPeopleFill 
} from 'react-icons/bs';
import {
  FaGamepad,
  FaMagic,
  FaAppStoreIos 
} from 'react-icons/fa';
import { CgWebsite } from "react-icons/cg";
import {IoMdSchool} from 'react-icons/io';
import {MdOutlineEmojiPeople, MdOutlineShortcut} from 'react-icons/md';

import getFormatedDateLength from '../functions/getFormatedDateLength.ts';

const ProjectContext = new Map([
    ["Company", <BsBuilding/>],
    ["Personal", <BsFillPersonFill/>],
    ["University", <IoMdSchool/>],
]);

const ProjectTypes = new Map([
  ["Game", <FaGamepad />],
  ["Website", <CgWebsite/>],
  ["Library", <IoLibrary/>],
  ["App", <FaAppStoreIos/>],
  ["TechDemo", <FaMagic/>],
]);

const DetailBoxes = ({projectContext, projectType, startingDate, finalDate, multiplayer}) => {
  const {start, final, duration} = getFormatedDateLength(startingDate, finalDate)
  const multiplayerLogo = multiplayer ? <BsFillPeopleFill/> : <MdOutlineEmojiPeople/>
  const multiplayerText = multiplayer ? "Multiplayer" : "Singleplayer"

  return (
    <>
        <div className="detail-boxes">
            <DetailBox text={`${start} - ${final}`} icon={<IoCalendarNumber/>}/>
            <DetailBox text={duration} icon={<FiClock/>}/>
            <DetailBox text={projectContext} icon={ProjectContext.get(projectContext)}/>
            <DetailBox text={projectType} icon={ProjectTypes.get(projectType)}/>
            {
              projectType == "Game" ?
              <DetailBox text={multiplayerText} icon={multiplayerLogo}/> :
              null
            }
        </div>
    </>
  )
}

export default DetailBoxes