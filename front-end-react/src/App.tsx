import React from 'react';

// @ts-ignore
import {About, Footer, Header, Skills, Testimonial, Work, Background} from './container/index.ts';
// @ts-ignore
import {Navbar} from './components/index.ts';
import './App.scss'

const App = () => {
  return (
    <div className='app'>
      {/*
      <Background />
      <Navbar />
      <Header />
      <About />    
      <Work />
      
      <Testimonial />
      <Footer />       
      
    
      */}
      
   
  <Skills />   
      
      
                 

    </div>
  )
}

export default App;