import React, {useState} from 'react'
//@ts-ignore
import PictureGallery from '../components/PictureGallery.tsx';
//@ts-ignore
import FullscreenImage from '../components/FullscreenImage.tsx';
import {urlFor} from '../client'
const PicturesWrapper = ({title, images}) => {
  const [currentImage, setCurrentImage] = useState(null);
  const pressed = () =>{
    setCurrentImage(null)
  }

  return (
    <div className="picture-wrapper">
        <h1>Watch the {title}'s <span>pictures</span> </h1>
        <div className="picture-gallery">
        <FullscreenImage image={currentImage} pressed={pressed}/>
        <PictureGallery images={images} setCurrentImage={setCurrentImage}/>
        </div>
    </div>  
  )
}

export default PicturesWrapper