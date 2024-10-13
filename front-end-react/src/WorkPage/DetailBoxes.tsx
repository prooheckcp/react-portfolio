import React from 'react'
import DetailBox from './DetailBox.tsx';
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

const DetailBoxes = ({projectType, startingDate, finalDate, multiplayer}) => {
  const {start, final, duration} = getFormatedDateLength(startingDate, finalDate)
  const multiplayerLogo = multiplayer ? <BsFillPeopleFill/> : <MdOutlineEmojiPeople/>
  const multiplayerText = multiplayer ? "Multiplayer" : "Singleplayer"

  console.log("Project Type: ", projectType)

  return (
    <>
        <div className="detail-boxes">
            <DetailBox text={`${start} - ${final}`} icon={<IoCalendarNumber/>}/>
            <DetailBox text={duration} icon={<FiClock/>}/>
            <DetailBox text={projectType} icon={ProjectTypes.get(projectType)}/> :

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