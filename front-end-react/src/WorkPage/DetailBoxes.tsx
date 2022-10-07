import React, {useEffect} from 'react'
import {motion} from 'framer-motion';
import DetailBox from './DetailBox.tsx';
import {SiRoblox} from 'react-icons/si';
import {IoCalendarNumber} from 'react-icons/io5';
import {FiClock} from 'react-icons/fi';
import {BsFillPersonFill, BsBuilding, BsFillPeopleFill} from 'react-icons/bs';
import {IoMdSchool} from 'react-icons/io';
import {MdOutlineEmojiPeople} from 'react-icons/md';

import getFormatedDateLength from '../functions/getFormatedDateLength.ts';

const ProjectTypes = new Map([
    ["Company", <BsBuilding/>],
    ["Personal", <BsFillPersonFill/>],
    ["University", <IoMdSchool/>],
]);

const DetailBoxes = ({projectType, robloxLink, startingDate, finalDate, multiplayer}) => {

  const {start, final, duration} = getFormatedDateLength(startingDate, finalDate)
  const multiplayerLogo = multiplayer ? <BsFillPeopleFill/> : <MdOutlineEmojiPeople/>
  const multiplayerText = multiplayer ? "Multiplayer" : "Singleplayer"
  return (
    <>
        <div className="detail-boxes">
            <DetailBox text={`${start} - ${final}`} icon={<IoCalendarNumber/>}/>
            <DetailBox text={duration} icon={<FiClock/>}/>
            <DetailBox text={projectType} icon={ProjectTypes.get(projectType)}/>
            <DetailBox text={multiplayerText} icon={multiplayerLogo}/>
        </div>
    </>
  )
}

export default DetailBoxes