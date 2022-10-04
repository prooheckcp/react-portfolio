import React from 'react'
import ReactPlayer from 'react-player';
import {useParams} from 'react-router-dom';
import './WorkPage.scss';

const WorkPage = () => {
  const {workIndex} = useParams();

  return (
    <>
      <div className="background">
        <div className="navbar-gap"/>
        <div className="project-info">
          <h1>
            Project Title
          </h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore magni minima quo fugit illo amet nulla asperiores dolorem sunt nostrum!
          </p>
        </div>

        <div>
          <div>

          </div>
          <div>
            
          </div>
        </div>

        <div className="video-wrapper">
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=BUd3V0D5d_E}`}
            className="react-player"
            controls
          />        
        </div>
        <div>
          <div>

          </div>
        </div>        
      </div>
    </>

  )
}

export default WorkPage