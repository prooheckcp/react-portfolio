import React from 'react'
import {motion} from 'framer-motion';
import './FullscreenImage.scss'

const FullscreenImage = ({image, pressed}) => {
    if(!image)
        return null;

    return (
        <div className="fullscreen-image">
            <motion.div className="background" onClick={pressed} />
            <div onClick={pressed} className="image-container">
                <img src={image} alt=""/>
            </div>
        </div>
    )
}

export default FullscreenImage