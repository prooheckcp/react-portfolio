import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
// @ts-ignore
import {About, Footer, Header, Skills, Testimonial, Work, Wave} from './container/index.ts';
// @ts-ignore
import {Navbar} from './components/index.ts';
import './App.scss'

const App = () => {
  return (
    <BrowserRouter>
    <div className='app'>
      <Navbar />
      <Routes>
        <Route path="/" element={
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
          } />
      </Routes>
    </div>
    </BrowserRouter>
  )
}

export default App;