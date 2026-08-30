import React from 'react';
import {GiConsoleController} from 'react-icons/gi';
import {BsGithub} from 'react-icons/bs';

const ButtonsSection = ({codeLink, projectLink}) => {
  if(!codeLink && !projectLink)
    return null;

  return (
    <div className="project-links">
      {codeLink &&
        <a href={codeLink} target="_blank" rel="noreferrer" className="project-link">
          <BsGithub /> View source
        </a>
      }
      {projectLink &&
        <a href={projectLink} target="_blank" rel="noreferrer" className="project-link project-link--primary">
          <GiConsoleController /> Play the project
        </a>
      }
    </div>
  );
}

export default ButtonsSection;
