import React from 'react'

const Header = ({title, description}) => {
  return (
    <>
    <div className="project-info">
      <h1>
        {title}
      </h1>
      <p>
        {description}
      </p>
    </div>
    </>
  )
}

export default Header