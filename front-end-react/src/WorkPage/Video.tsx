import React from 'react'
import ReactPlayer from 'react-player';

const Video = ({trailerLink, title}) => {
  return (
    <>
    {
        trailerLink ?
        <>
          <div className="video-wrapper">
            <h1>Watch {title}'s <span>trailer</span> </h1>
            <ReactPlayer
              url={`${trailerLink}`}
              className="react-player"
              controls
            />        
          </div> 
        </>
        :
        ''
      } 
    </>
  )
}

export default Video