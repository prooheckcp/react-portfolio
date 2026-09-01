import React from 'react';
import {GiConsoleController} from 'react-icons/gi';
import {BsGithub} from 'react-icons/bs';
import {AiFillStar} from 'react-icons/ai';

const ButtonsSection = ({codeLink, projectLink, stars}) => {
  if(!codeLink && !projectLink)
    return null;

  return (
    <div className="project-links">
      {codeLink &&
        <a href={codeLink} target="_blank" rel="noreferrer" className="project-link">
          <BsGithub /> View source
          {stars > 0 &&
            <span className="project-link__stars" title={`${stars} stars on GitHub`}>
              <AiFillStar /> {stars}
            </span>
          }
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
