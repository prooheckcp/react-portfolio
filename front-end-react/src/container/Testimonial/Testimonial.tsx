import React, {useState, useEffect} from 'react';
import './Testimonial.scss';
import {motion, AnimatePresence} from 'framer-motion';
import { HiChevronLeft, HiChevronRight} from 'react-icons/hi';
import {FaQuoteRight} from 'react-icons/fa';

import {urlFor} from '../../client';

// @ts-ignore
import {AppWrap, MotionWrap} from '../../wrapper/index.ts'
// @ts-ignore
import FetchSanityData from '../../functions/FetchSanityData.ts';

const Testimonial : React.FC = () => {
  const [brands, setBrands] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [[currentIndex, direction], setPage] = useState<[number, number]>([0, 0]);
  const currentTestimonial = testimonials[currentIndex];

  /* The old handler animated opacity [0,0] then [1,1] - never an actual fade,
     just a one-second freeze followed by a pop. AnimatePresence does a real
     crossfade and cannot desync from the index. */
  const paginate = (nextDirection : number) => {
    if(testimonials.length === 0)
      return;

    const next = (currentIndex + nextDirection + testimonials.length) % testimonials.length;
    setPage([next, nextDirection]);
  };

  useEffect(()=>{
    FetchSanityData("testimonials", setTestimonials);
    FetchSanityData("brands", setBrands);
  }, [])

  return (
    <>
    <h2 className="head-text">What are people saying about me?</h2>

      {testimonials.length > 0 && (
        <>
          <div className="app__testimonial-stage">
            <AnimatePresence initial={false} mode="wait" custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                className="app__testimonial-item app__flex"
                initial={{opacity: 0, x: direction >= 0 ? 40 : -40}}
                animate={{opacity: 1, x: 0}}
                exit={{opacity: 0, x: direction >= 0 ? -40 : 40}}
                transition={{duration: 0.28, ease: [0.2, 0.8, 0.2, 1]}}
              >
                <img src={urlFor(currentTestimonial.imgurl)} alt="testimonial" />
                <div className="app__testimonial-content">
                  <div>
                    <h4 className="bold-text">{currentTestimonial.name}  <FaQuoteRight/></h4>
                    <h5 className="p-text">{currentTestimonial.company}</h5>
                  </div>
                  <p className="p-text">{currentTestimonial.feedback}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {testimonials.length > 1 &&
            <div className="app__testimonial-btns app__flex">
              <div className="app__flex" onClick={()=> paginate(-1)} role="button" aria-label="Previous testimonial">
                <HiChevronLeft />
              </div>

              <div className="app__flex" onClick={()=> paginate(1)} role="button" aria-label="Next testimonial">
                <HiChevronRight />
              </div>
            </div>
          }
        </>
      )}

      <h2 className="head-text">Companies I've worked with</h2>

      {brands.length > 0 &&
        <div className="app__brands-marquee">
          {/* Two identical tracks: when the first scrolls fully out the second
              is exactly in its place, so the loop has no visible seam. */}
          <div className="app__brands-track">
            {[0, 1].map((copy) =>
              <div className="app__brands-group" key={`copy-${copy}`} aria-hidden={copy === 1}>
                {brands.map((brand) =>
                  <div className="app__brands-logo" key={`${copy}-${brand._id}`}>
                    <img src={urlFor(brand.imgUrl)} alt={copy === 0 ? brand.name : ''} />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      }
    </>
  )
}

export default AppWrap(MotionWrap(Testimonial, "app__testimonial"), "testimonials", "app__background app__testimonialSize")
