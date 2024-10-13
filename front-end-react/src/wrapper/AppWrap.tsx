import React from 'react';
// @ts-ignore
import { NavigationDots } from '../components/index.ts';

const AppWrap = (Component, idName, classNames) => function HOC() {
    return (
        <div id={idName} className={`app__container ${classNames}`}>
            <Component />
            <NavigationDots active={idName} />
        </div>
    );
};

export default AppWrap;