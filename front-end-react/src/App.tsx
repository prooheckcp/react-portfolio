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
  
      
      <Skills />   
      <Testimonial />   
      <Footer />       
      
    
      */}
      
        <Navbar />
      <Header />
      <About />
      <Wave colorSchema="second-fill"/>   
      <Work />
      
      
                 

    </div>
  )
}

export default App;