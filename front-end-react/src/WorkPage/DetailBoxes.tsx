import React from 'react'
import {motion} from 'framer-motion';
import DetailBox from './DetailBox.tsx';
import {SiRoblox} from 'react-icons/si';
import {IoCalendarNumber} from 'react-icons/io5';

const DetailBoxes = () => {
  return (
    <>
        <div className="detail-boxes">
            <DetailBox text={"hello"} icon={<SiRoblox/>}/>
            <DetailBox text={"hello"} icon={<IoCalendarNumber/>}/>
            <DetailBox text={"hello"} icon={"a"}/>
        </div>
    </>
  )
}

export default DetailBoxes