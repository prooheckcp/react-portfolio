import React from 'react';
// @ts-ignore
import { NavigationDots, SocialMedia } from '../components/index.ts';

const AppWrap = (Component, idName, classNames) => function HOC() {
    return (
        <div id={idName} className={`app__container ${classNames}`}>
            <SocialMedia />
            <Component />
            <NavigationDots active={idName} />
        </div>
    );
};

export default AppWrap;