import React from 'react'
// @ts-ignore
import {About, Header, QuickLinks, Testimonial, Wave} from '../container/index.ts';
import { SocialMedia } from './../components/index.ts';

/* Home is the narrative only: who I am and proof.
   Work, Skills and Contact are their own routes. */
const MainPage = () => {
  return (
    <>
      <SocialMedia />
      <Header />
      <Wave colorSchema="first-fill"/>
      <About />
      <Wave colorSchema="second-fill"/>
      <Testimonial />
      <Wave colorSchema="first-fill"/>
      <QuickLinks />
    </>
  )
}

export default MainPage
