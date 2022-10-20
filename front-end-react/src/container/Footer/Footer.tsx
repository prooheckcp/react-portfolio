import React, {useState} from 'react';
import {images} from '../../constants';
// @ts-ignore
import {AppWrap, MotionWrap} from '../../wrapper/index.ts';
import {client} from '../../client';
import './Footer.scss';

const EMAIL_ADDRESS : string = "vasco.soares.2001@gmail.com"
const PHONE_NUMBER : string = "+351 918 495 220"
const DISCORD : string = "Prooheckcp#1906"

const Footer : React.FC = () => {
  const [formData, setFormData] = useState({name: '', email: '', message: ''});
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const currentYear : number = (new Date()).getFullYear();
  
  const {name, email, message} = formData;
  const handleChangeInput = (e) => {
    const {name, value} = e.target;
    setFormData({...formData, [name]: value});
  }

  const handleSubmit = () =>{
    setLoading(true);

    const contact = {
      _type: 'contact',
      name: name,
      email: email,
      message: message,
    }

    client.create(contact).then(()=>{
      setLoading(false);
      setIsFormSubmitted(true);
    })
  }

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
          <a href={"https://wa.me/351918495220"} target="_blank" className="p-text">{PHONE_NUMBER}</a>
        </div>
        <div className="app__footer-card">
          <img src={images.discord} alt="discord" />
          <a href={"https://discordapp.com/users/469204779168432148"} target="_blank" className="p-text">{DISCORD}</a>
        </div>
      </div>

      {!isFormSubmitted ? 
        <div className="app__footer-form app__flex">
          <div className="app__flex">
            <input className="p-text" type="text" placeholder="Your Name" name="name" value={name} onChange={handleChangeInput}></input>
          </div>
          <div className="app__flex">
            <input className="p-text" type="email" placeholder="Your Email" name="email" value={email} onChange={handleChangeInput}></input>
          </div>
          <div>
            <textarea className="p-text" placeholder='Your Message' value={message} name="message" onChange={handleChangeInput}></textarea>
          </div>
          <button type="button" className="p-text" onClick={handleSubmit}>{loading ? 'Sending': 'Send Message'}</button>
        </div> :
        <div>
          <h3 className="head-text">Thank you for getting in touch!</h3>
        </div>
      }

      <div className="copyright">
        <p className="p-text">@{currentYear} Vasco Soares</p>
        <p className="p-text">All rights reserved</p>
      </div>
    </>
  )
}

export default AppWrap(MotionWrap(Footer, "app__footer"), "contact", "app__background app__secondBackground");