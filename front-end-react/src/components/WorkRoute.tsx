import React from 'react';
// @ts-ignore
import {Work} from '../container/index.ts';
// @ts-ignore
import SubPage from './SubPage.tsx';
import { SocialMedia } from './../components/index.ts';

const WorkRoute = () => (
  <>
    <SocialMedia />
    <SubPage title="Work">
      <Work />
    </SubPage>
  </>
);

export default WorkRoute;
