import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
// @ts-ignore
import WorkPage from './WorkPage/WorkPage.tsx';
// @ts-ignore
import {Navbar, MainPage} from './components/index.ts';
import './App.scss'

const App = () => {
  return (
    <BrowserRouter>
      <div className='app'>
        <Navbar />
        <Routes>
            <Route path="/work/:workIndex" element={<WorkPage />} />
            <Route path="/home" element={<MainPage/>} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App;