import React, {useEffect} from 'react';
// @ts-ignore
import {Credentials} from '../container/index.ts';
import { SocialMedia } from './../components/index.ts';

const CredentialsRoute = () => {
  useEffect(() => {
    const previous = document.title;
    document.title = 'Credentials · Vasco Soares';
    window.scrollTo(0, 0);
    return () => { document.title = previous; };
  }, []);

  return (
    <>
      <SocialMedia />
      <Credentials />
    </>
  );
};

export default CredentialsRoute;
