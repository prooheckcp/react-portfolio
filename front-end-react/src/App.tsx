import React from 'react';

// @ts-ignore
import {About, Footer, Header, Skills, Testimonial, Work, Background} from './container/index.ts';
// @ts-ignore
import {Navbar} from './components/index.ts';
import './App.scss'

const App = () => {
  return (
    <div className='app'>
      <Background />

      <Footer />
      {/*
      <Navbar />
      <Header />
      <About />
      <Work />
      <Skills />              
      <Testimonial />
      
      */}      

    </div>
  )
}

export default App;