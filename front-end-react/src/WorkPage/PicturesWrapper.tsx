import React from 'react'
//@ts-ignore
import PictureGallery from '../components/PictureGallery.tsx';
//@ts-ignore
import FullscreenImage from '../components/FullscreenImage.tsx';
import {urlFor} from '../client'
const PicturesWrapper = ({title, images}) => {
  return (
    <div className="picture-wrapper">
        <h1>Watch the {title}'s <span>pictures</span> </h1>
        <div className="picture-gallery">
        <FullscreenImage image={urlFor(images[0])}/>
        <PictureGallery images={images}/>
        </div>
    </div>  
  )
}

export default PicturesWrapper