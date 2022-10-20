import React from 'react'
import {urlFor} from '../client';
import {BsFillTagsFill} from 'react-icons/bs';
// @ts-ignore
import GetFormattedTags from '../functions/GetFormattedTags.ts';

const Header = ({title, description, imgUrl, tags}) => {
  tags = tags || [];

  let tagsText = GetFormattedTags(tags);

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
        <div className="tags-container">
              <p><BsFillTagsFill/> {tagsText}</p>
          </div>   
      </div>
    </div>

    </>
  )
}

export default Header