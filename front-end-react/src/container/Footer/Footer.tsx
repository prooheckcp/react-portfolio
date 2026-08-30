import React from 'react';
import {images} from '../../constants';
// @ts-ignore
import {AppWrap, MotionWrap} from '../../wrapper/index.ts';
import './Footer.scss';

const EMAIL_ADDRESS : string = "vasco.soares.2001@gmail.com"
const PHONE_NUMBER : string = "+81 70-9160-7616"
const DISCORD : string = "prooheckcp"

const Footer : React.FC = () => {
  const currentYear : number = (new Date()).getFullYear();
  
  return (
    <>
      <h2 className="head-text">Liked my work? Chat with me!</h2>

      <div className="app__footer-cards">
        <div className="app__footer-card">
          <img src={images.gmail} alt="email" />
          <a href={"mailto:"+EMAIL_ADDRESS} className="p-text">{EMAIL_ADDRESS}</a>
        </div>
        <div className="app__footer-card">
          <img src={images.whatsapp} alt="mobile" />
          <a href={"https://wa.me/817091607616"} target="_blank" className="p-text">{PHONE_NUMBER}</a>
        </div>
        <div className="app__footer-card">
          <img src={images.discord} alt="discord" />
          <a href={"https://discordapp.com/users/469204779168432148"} target="_blank" className="p-text">{DISCORD}</a>
        </div>
      </div>

      <div className="copyright">
        <p className="p-text">@{currentYear} Vasco Soares</p>
        <p className="p-text">All rights reserved</p>
      </div>

    </>
  )
}

export default AppWrap(MotionWrap(Footer, "app__footer"), "contact", "app__background app__secondBackground");