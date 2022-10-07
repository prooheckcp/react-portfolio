import React from 'react'
import {BsTwitter, BsGithub, BsLinkedin, BsYoutube} from 'react-icons/bs';

function openWeb(link : string){
  window.open(link);
}

const SocialMedia = () => {
  return (
    <div className="app__social">
        <div onClick={()=>{
              openWeb("https://twitter.com/Prooheckcp")
            }
        }>
          <BsTwitter/>
        </div>
        <div onClick={()=>{
              openWeb("https://github.com/prooheckcp")
            }
        }>
          <BsGithub/>
        </div>
        <div onClick={()=>{
              openWeb("https://www.linkedin.com/in/vasco-soares-564682194/")
            }
        }>
          <BsLinkedin/>
        </div>
        <div onClick={()=>{
              openWeb("https://www.youtube.com/prooheckcp")
            }
        }>
          <BsYoutube/>  
        </div>
    </div>
  )
}

export default SocialMedia