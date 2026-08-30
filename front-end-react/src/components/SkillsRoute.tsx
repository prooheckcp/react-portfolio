import React from 'react';
// @ts-ignore
import {Skills} from '../container/index.ts';
// @ts-ignore
import SubPage from './SubPage.tsx';
import { SocialMedia } from './../components/index.ts';

const SkillsRoute = () => (
  <>
    <SocialMedia />
    <SubPage title="Skills & Experience">
      <Skills />
    </SubPage>
  </>
);

export default SkillsRoute;
