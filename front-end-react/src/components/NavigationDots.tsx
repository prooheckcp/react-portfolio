import React from 'react'

const sections : Array<string> = ['home', 'about', 'work', 'skills', 'testimonials', 'contact']

const NavigationDots = ({active}) => {
  return (
    <div className="app__navigation">
        {sections.map( (item, index) =>
            <a 
            href={`#${item}`}
            key={item + index}
            className="app__navigation-dot"
            onClick={()=>{}}
            style={active === item ? {backgroundColor: '#313BAC'} : {}}
            />
        )}
    </div>
  )
}

export default NavigationDots