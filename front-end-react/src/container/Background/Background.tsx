import React , {useCallback}from 'react'
import './Background.scss'
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import particlesData from '../../constants/particlesData';

const Background = () => {
    const particlesInit = useCallback(async (engine) => {
        await loadFull(engine);
    }, []);

  return (
    <>
        <div id="background">

        </div>
    </>
  )
}

export default Background