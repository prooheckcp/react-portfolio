import React from 'react';
//@ts-ignore
import {HOME_SECTIONS} from '../constants/navigation.ts';

const NavigationDots = ({active}) => {
  // Work and Skills are their own routes now, so they get no scroll dot.
  if(!HOME_SECTIONS.includes(active))
    return null;

  return (
    <div className="app__navigation">
        {HOME_SECTIONS.map((item, index) =>
            <a
            href={`#${item}`}
            key={item + index}
            aria-label={item}
            className="app__navigation-dot"
            style={active === item ? {backgroundColor: 'var(--accent)'} : {}}
            />
        )}
    </div>
  )
}

export default NavigationDots
