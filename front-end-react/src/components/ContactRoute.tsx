import React, {useEffect} from 'react';
// @ts-ignore
import {Contact} from '../container/index.ts';

const ContactRoute = () => {
  useEffect(() => {
    const previous = document.title;
    document.title = 'Contact · Vasco Soares';
    window.scrollTo(0, 0);
    return () => { document.title = previous; };
  }, []);

  return <Contact />;
};

export default ContactRoute;
