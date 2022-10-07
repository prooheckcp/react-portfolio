import React from 'react'
import {motion} from 'framer-motion';
import './FullscreenImage.scss'

const FullscreenImage = ({image}) => {
  return (
    <div className="fullscreen-image">
        <div className="background"></div>
        <img src={image} alt="" />
    </div>
  )
}

export default FullscreenImage