import React, {useEffect, useState, useLayoutEffect} from 'react'
import { ProGallery } from 'pro-gallery';
import 'pro-gallery/dist/statics/main.css';
import {urlFor} from '../client';

const PictureGallery = ({images}) => {
  const [items, setItems] = useState<Array<any>>([]);
  const [container, setContainer] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useLayoutEffect(() => {
    function updateSize() {
      setContainer({
        width: window.innerWidth,
        height: window.innerHeight
      });
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  useEffect(()=>{
    let imagesArray : Array<any> = [];
    for(let index = 0; index < images.length; index++){
      const imageInstance = images[index];
      const imageObject = {
        itemId: 'differentItem',
        mediaUrl: urlFor(imageInstance).url(),
        metaData: {
          type: 'image',
          title: 'sample-title',
          description: 'sample-description',
          focalPoint: [0, 0],
          link: {
                  url: 'http://example.com',
                  target: '_blank'
          },
        }        
      }
      console.log(images)
      imagesArray.push(imageObject);
    }
    setItems(imagesArray)
  }, [])

  return (
    <ProGallery items={items} container={container} 
    options={
      {
          "layoutParams": {
              "structure": {
                  "galleryLayout": -1
              }
          }
      }
          }/>
  )
}

export default PictureGallery