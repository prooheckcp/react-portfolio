import React from 'react';

// @ts-ignore
import {About, Footer, Header, Skills, Testimonial, Work} from './container/index.ts';
// @ts-ignore
import {Navbar} from './components/index.ts';

const App = () => {
  return (
    <div className='app'>
      <Navbar />
      <Header />
      <About />
      <Work />
      <Skills />
      <Testimonial />
      <Footer />
    </div>
  )
}

export default App;