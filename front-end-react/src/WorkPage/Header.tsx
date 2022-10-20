import React from 'react'
import {urlFor} from '../client';

const Header = ({title, description, imgUrl}) => {
  return (
    <>
    <div className="project-info-container">
      <div className="project-info">
        <h1 className="title">
          {title}
        </h1>
        <div className="details-container">
          <div className="image-banner">
              <img src={urlFor(imgUrl)} alt="" />
          </div>
          <div className="description">
            <h1>Description</h1>
            <p className="desc-text">
              {description}
            </p>
          </div>      
        </div>
      </div>
    </div>

    </>
  )
}

export default Header