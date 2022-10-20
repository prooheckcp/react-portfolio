import React from 'react'
// @ts-ignore
import {About, Footer, Header, Skills, Testimonial, Work, Wave} from '../container/index.ts';

const MainPage = () => {
  return (
    <>
        <Header />
        <Wave id={"about"} colorSchema="first-fill"/>  
        <About />      
        <Wave id={"work"} colorSchema="second-fill"/>   
        <Work />
        <Wave id={"skills"} colorSchema="first-fill"/>  
        <Skills />   
        <Wave id={"testimonials"} colorSchema="second-fill"/>  
        <Testimonial />   
        <Wave id={"contact"} colorSchema="first-fill"/>  
        <Footer />
    </>
  )
}

export default MainPage