import React, {useState} from 'react';
import {images} from '../../constants';
// @ts-ignore
import {AppWrap, MotionWrap} from '../../wrapper/index.ts';
import {client} from '../../client';
import './Footer.scss';

const EMAIL_ADDRESS : string = "vasco.soares.2001@gmail.com"
const PHONE_NUMBER : string = "+351 918 495 220"
const Footer : React.FC = () => {
  return (
    <>
      <h2 className="head-text">Take a coffee & Chat With me</h2>

      <div className="app__footer-cards">
        <div className="app__footer-card">
          <img src={images.email} alt="email" />
          <a href={"mailto:"+EMAIL_ADDRESS} className="p-text">{EMAIL_ADDRESS}</a>
        </div>
        <div className="app__footer-card">
          <img src={images.mobile} alt="mobile" />
          <a href={"tel: "+PHONE_NUMBER} className="p-text">{PHONE_NUMBER}</a>
        </div>
      </div>

      <div className="app__footer-form app__flex">
        <div className="app__flex">
          <input className="p-text" type="text" placeholder="Your Name" name="name" value={name} onChange={handleChangeInput}></>
        </div>
        <div className="app__flex">
          <input className="p-text" type="email" placeholder="Your Email" name="email" value={email} onChange={handleChangeInput}></>
        </div>
        <div>
          <textarea className="p-text" placeholder='Your Message' value={message} name={message} onChange={handleChangeInput}></textarea>
          <button type="button" className="p-text" onClick={handleSubmit}>Send Message</button>
        </div>
      </div>
    </>
  )
}

export default AppWrap(MotionWrap(Footer, "app__footer"), "contact");