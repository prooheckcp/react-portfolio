import React from 'react'
// @ts-ignore
import {About, Footer, Header, Skills, Testimonial, Work, Wave} from '../container/index.ts';

const MainPage = () => {
  return (
    <>
        <Header />
        <Wave colorSchema="first-fill"/>  
        <About />
        <Wave colorSchema="second-fill"/>   
        <Work />
        <Wave colorSchema="first-fill"/>  
        <Skills />   
        <Wave colorSchema="second-fill"/>  
        <Testimonial />   
        <Wave colorSchema="first-fill"/>  
        <Footer />    
    </>
  )
}

export default MainPage