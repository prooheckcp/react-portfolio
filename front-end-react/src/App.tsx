import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
// @ts-ignore
import WorkPage from './WorkPage/WorkPage.tsx';
// @ts-ignore
import {Navbar, MainPage} from './components/index.ts';
import './App.scss'

const App = () => {
  return (
    <>
      <BrowserRouter basename='/'>
        <div className='app'>
          <Navbar />
          <Routes>
              <Route path="/work/:workIndex" element={<WorkPage />} />
              <Route path="/" element={<MainPage/>} />
          </Routes>
        </div>
      </BrowserRouter>
      <BrowserRouter basename='/work'>
        <Routes>
          <Route path=":workIndex" element={<WorkPage />} />
        </Routes>
      </BrowserRouter>
    </>

  )
}

export default App;