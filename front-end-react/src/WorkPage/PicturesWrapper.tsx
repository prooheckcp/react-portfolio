import React from 'react'
//@ts-ignore
import PictureGallery from '../components/PictureGallery.tsx';

const PicturesWrapper = ({title, images}) => {
  return (
    <div className="picture-wrapper">
        <h1>Watch the {title}'s <span>pictures</span> </h1>
        <div className="picture-gallery">
        <PictureGallery images={images}/>
        </div>
    </div>  
  )
}

export default PicturesWrapper