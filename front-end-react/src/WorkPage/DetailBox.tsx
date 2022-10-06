import React from 'react'
import {motion} from 'framer-motion';

const DetailBox = ({text, icon}) => {
  return (
        <motion.div className="detail-item" whileHover={{scale: 1.05, transition: 1.2}}>
        <div className="detail-icon">
            <h1>{icon}</h1>
        </div>
        <p>{text}</p>
    </motion.div>
  )
}

export default DetailBox