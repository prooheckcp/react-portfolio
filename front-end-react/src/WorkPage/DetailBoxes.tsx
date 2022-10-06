import React from 'react'
import {motion} from 'framer-motion';
import DetailBox from './DetailBox.tsx';
import {SiRoblox} from 'react-icons/si';
import {IoCalendarNumber} from 'react-icons/io5';
import {FiClock} from 'react-icons/fi';
import {BsFillPersonFill, BsBuilding} from 'react-icons/bs'
import {IoMdSchool} from 'react-icons/io';

const PROJECT_TYPE = [
<BsFillPersonFill/>, //Personal
<IoMdSchool/>, //University
<BsBuilding/>
]

const DetailBoxes = () => {
  return (
    <>
        <div className="detail-boxes">
            <DetailBox text={"hello"} icon={<SiRoblox/>}/>
            <DetailBox text={"hello"} icon={<IoCalendarNumber/>}/>
            <DetailBox text={"hello"} icon={<FiClock/>}/>
            <DetailBox text={"hello"} icon={<IoMdSchool/>}/>
        </div>
    </>
  )
}

export default DetailBoxes