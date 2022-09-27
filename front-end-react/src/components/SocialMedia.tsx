import React from 'react'
import {BsTwitter, BsGithub, BsLinkedin, BsYoutube} from 'react-icons/bs';

function openWeb(link : string){
  window.open(link);
}

const SocialMedia = () => {
  return (
    <div className="app__social">
        <div>
          <BsTwitter 
            onClick={()=>{
              openWeb("https://twitter.com/Prooheckcp")
            }}
          />
        </div>
        <div>
          <BsGithub 
            onClick={()=>{
              openWeb("https://github.com/prooheckcp")
            }}
          />
        </div>
        <div>
          <BsLinkedin 
            onClick={()=>{
              openWeb("https://www.linkedin.com/in/vasco-soares-564682194/")
            }}
          />
        </div>
        <div>
          <BsYoutube
            onClick={()=>{
              openWeb("https://www.youtube.com/prooheckcp")
            }}
          />  
        </div>
    </div>
  )
}

export default SocialMedia