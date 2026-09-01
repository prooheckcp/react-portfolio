import React from 'react';
import {Link} from 'react-router-dom';
import {IoArrowBack} from 'react-icons/io5';
import {urlFor} from '../client';
//@ts-ignore
import {isInDevelopment} from '../functions/workStatus.ts';

const ProjectHero = ({title, description, imgUrl, tags, finalDate}) => {
  const cleanTags = (tags ?? []).filter((tag) => tag && tag.toLowerCase().trim() !== "all");

  return (
    <header className="project-hero">
      <div className="project-hero__media">
        {imgUrl && <img src={urlFor(imgUrl).width(1920).auto('format').url()} alt="" />}
        <div className="project-hero__scrim" />
      </div>

      <div className="project-hero__content">
        <Link to="/work" className="project-hero__back">
          <IoArrowBack /> Back to portfolio
        </Link>

        {isInDevelopment({finalDate}) &&
          <span className="project-hero__wip">
            <span className="project-hero__wip-dot" />
            In development
          </span>
        }

        <h1 className="project-hero__title">{title}</h1>

        {cleanTags.length > 0 &&
          <ul className="project-hero__tags">
            {cleanTags.map((tag) => <li key={tag}>{tag}</li>)}
          </ul>
        }
      </div>
    </header>
  );
}

export default ProjectHero;
