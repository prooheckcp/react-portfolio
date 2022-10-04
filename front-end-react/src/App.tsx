import React from 'react';

// @ts-ignore
import {About, Footer, Header, Skills, Testimonial, Work, Background, Wave} from './container/index.ts';
// @ts-ignore
import {Navbar} from './components/index.ts';
import './App.scss'

const App = () => {
  return (
    <div className='app'>
      {/*
      <Background />
  
    
      
    
      */}
      
      <Navbar />
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
      
                 

    </div>
  )
}

export default App;