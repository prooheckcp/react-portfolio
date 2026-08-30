import React from 'react';
import ReactPlayer from 'react-player';

const Video = ({trailerLink, title}) => {
  if(!trailerLink)
    return null;

  return (
    <section className="project-section">
      <h2 className="project-section__title">{title} <span>trailer</span></h2>
      <div className="project-video">
        <ReactPlayer
          url={trailerLink}
          className="react-player"
          width="100%"
          height="100%"
          controls
        />
      </div>
    </section>
  );
}

export default Video;
