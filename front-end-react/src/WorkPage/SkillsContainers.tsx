import React from 'react';
//@ts-ignore
import SkillContainer from '../components/SkillsContainer.tsx';

const SkillsContainers = ({usedLanguages, usedTech}) => {
  if(usedLanguages.length === 0 && usedTech.length === 0)
    return null;

  return (
    <div className="project-stack">
      {usedLanguages.length > 0 &&
        <div className="project-stack__group">
          <h3 className="project-stack__title">Languages</h3>
          <SkillContainer skillArray={usedLanguages} showCircle={false} toolTip={"name"} circleClassName={"white-skill"} />
        </div>
      }

      {usedTech.length > 0 &&
        <div className="project-stack__group">
          <h3 className="project-stack__title">Tech</h3>
          <SkillContainer skillArray={usedTech} showCircle={false} toolTip={"name"} circleClassName={"white-skill"} />
        </div>
      }
    </div>
  );
}

export default SkillsContainers;
