import React, {useState, useEffect} from 'react';
import './Testimonial.scss';
import {motion, MotionConfig, useAnimation} from 'framer-motion';
import { HiChevronLeft, HiChevronRight} from 'react-icons/hi';
import {FaQuoteRight} from 'react-icons/fa';

import {urlFor} from '../../client';

// @ts-ignore
import {AppWrap, MotionWrap} from '../../wrapper/index.ts'
// @ts-ignore
import FetchSanityData from '../../functions/FetchSanityData.ts';

const ANIMATION_DURATION : number = 1;

const Testimonial : React.FC = () => {
  const [brands, setBrands] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardMoving, setCardMoving] = useState(false);
  const currentTestimonial = testimonials[currentIndex];
  const controls = useAnimation();

  const handleClick = (index, direction) => {
    if (cardMoving) return;

    setCardMoving(true);

    controls.start({
      opacity: [0, 0],
      transition: {
        ease: 'linear',
        duration: ANIMATION_DURATION
      },
    }).then(() => {
      // Animation is complete, now update the state
      setCurrentIndex(index);
      setCardMoving(false);
    }).then(()=>{
      controls.start({
        opacity: [1, 1],
        transition: {
          ease: 'linear',
          duration: ANIMATION_DURATION,
        },
      })
    });
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

          <motion.div
            animate={controls}
            className="app__testimonial-item app__flex"
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


          <div className="app__testimonial-btns app__flex">
            <div className="app__flex" onClick={()=> handleClick(currentIndex === 0 ? testimonials.length - 1 : currentIndex -1, -1)}>
              <HiChevronLeft />
            </div>

            <div className="app__flex" onClick={()=> handleClick(currentIndex === testimonials.length - 1 ? 0 : currentIndex + 1, 1)}>
              <HiChevronRight />
            </div>
          </div>
        </>
      )}

      <h2 className="head-text">Companies I've worked with</h2>
      <div className="app__testimonial-brands app__flex">
        {brands.map((brand) =>
          <motion.div
            whileInView={{opacity: [0, 1]}}
            transition={{duration: 0.5, type:'tween'}}
            key={brand._id}
          >
            <img src={urlFor(brand.imgUrl)} alt={brand.name} />
          </motion.div>
        )}
      </div>
    </>
  )
}

export default AppWrap(MotionWrap(Testimonial, "app__testimonial"), "testimonials", "app__background app__testimonialSize")