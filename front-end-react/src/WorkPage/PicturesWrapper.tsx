import React, {useState, useMemo} from 'react';
//@ts-ignore
import Lightbox from '../components/Lightbox.tsx';
import {urlFor} from '../client';

const PicturesWrapper = ({title, images}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // Full-size URLs for the lightbox, narrower ones for the grid thumbnails.
  const full = useMemo(
    () => (images ?? []).map((image) => urlFor(image).url()),
    [images]
  );
  const thumbs = useMemo(
    () => (images ?? []).map((image) => urlFor(image).width(720).fit('max').auto('format').url()),
    [images]
  );

  if(full.length === 0)
    return null;

  return (
    <section className="project-section project-gallery">
      <h2 className="project-section__title">{title} <span>gallery</span></h2>

      <div className="project-gallery__grid">
        {thumbs.map((src, index) =>
          <button
            key={src + index}
            className="project-gallery__item"
            onClick={() => setOpenIndex(index)}
            aria-label={`Open image ${index + 1} of ${thumbs.length}`}
          >
            <img src={src} alt="" loading="lazy" />
          </button>
        )}
      </div>

      <Lightbox
        images={full}
        index={openIndex}
        onClose={() => setOpenIndex(null)}
        onNavigate={setOpenIndex}
      />
    </section>
  );
}

export default PicturesWrapper;
