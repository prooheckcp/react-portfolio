import React from 'react';
// @ts-ignore
import { NavigationDots, SocialMedia } from '../components/index.ts';

const AppWrap = (Component, idName, classNames) => function HOC() {
    const currentYear : number = (new Date()).getFullYear();
    return (
        <div id={idName} className={`app__container ${classNames}`}>
        <SocialMedia />
        <div className="app__wrapper app__flex">
            <Component />

            <div className="copyright">
            <p className="p-text">@{currentYear} Vasco Soares</p>
            <p className="p-text">All rights reserved</p>
            </div>
        </div>
        <NavigationDots active={idName} />
        </div>
    );
};

export default AppWrap;