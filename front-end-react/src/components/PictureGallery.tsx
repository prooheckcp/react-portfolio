import React, {useEffect, useState, useLayoutEffect} from 'react'
import { ProGallery } from 'pro-gallery';
import 'pro-gallery/dist/statics/main.css';
import {urlFor} from '../client';

const OPTIONS = {
  "layoutParams": {
      "structure": {
          "galleryLayout": -1
      }
  },
  "behaviourParams": {
      "item": {
          "content": {
              "hoverAnimation": "ZOOM_IN"
          },
          "clickAction": "FULLSCREEN",
          "overlay": {
              "hoveringBehaviour": "NEVER_VISIBLE"
          }
      },
      "gallery": {
          "blockContextMenu": false
      }
  }
}

const PictureGallery = ({images}) => {
  const [items, setItems] = useState<Array<any>>([]);
  const [container, setContainer] = useState({
    width: window.innerWidth,
    height: window.innerHeight * 2
  });

  useLayoutEffect(() => {
    function updateSize() {
      setContainer({
        width: window.innerWidth,
        height: window.innerHeight * 2
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
      imagesArray.push(imageObject);
    }
    setItems(imagesArray)
  }, [])

  return (
    <ProGallery items={items} container={container} 
    options={OPTIONS} eventsListener={(eventName, eventData)=>{
      if(eventName != "ITEM_ACTION_TRIGGERED")
        return;

      console.log(eventData.url);
    }}/>
  )
}

export default PictureGallery