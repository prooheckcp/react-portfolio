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

const ANIMATION_DURATION : number = 0.7;

const Testimonial : React.FC = () => {
  const [brands, setBrands] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardMoving, setCardMoving] = useState(false);
  const currentTestimonial = testimonials[currentIndex];
  const controls = useAnimation()

  const handleClick = (index : number, direction : number) => {
    if(cardMoving)
      return;
    
    setCardMoving(true);

    controls.start({
      opacity: [1, 0, 0, 0, 0, 1],
      x: [0, 200 * direction, 200 * direction, -200 * direction, -200 * direction, 0],
      transition: {ease:"linear", repeat: 0, times: [0, 0.2, 0.5, 0.5, 0.8, 1], duration: ANIMATION_DURATION},
    });

    setTimeout(() => {
      setCurrentIndex(index);
      setCardMoving(false);
    }, ANIMATION_DURATION * 1000);
  }
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
      )}
    </>
  )
}

export default AppWrap(MotionWrap(Testimonial, "app__testimonial"), null, "app__background app__testimonialSize")