import React, {useEffect} from 'react';
// @ts-ignore
import {Research} from '../container/index.ts';
import { SocialMedia } from './../components/index.ts';

const ResearchRoute = () => {
  useEffect(() => {
    const previous = document.title;
    document.title = 'Research · Vasco Soares';
    window.scrollTo(0, 0);
    return () => { document.title = previous; };
  }, []);

  return (
    <>
      <SocialMedia />
      <Research />
    </>
  );
};

export default ResearchRoute;
