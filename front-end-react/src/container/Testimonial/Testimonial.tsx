import React, {useState, useEffect} from 'react';
import './Testimonial.scss';
import {motion, MotionConfig} from 'framer-motion';
import { HiChevronLeft, HiChevronRight} from 'react-icons/hi';
import {urlFor} from '../../client';

// @ts-ignore
import {AppWrap, MotionWrap} from '../../wrapper/index.ts'
// @ts-ignore
import FetchSanityData from '../../functions/FetchSanityData.ts';

const Testimonial : React.FC = () => {
  const [brands, setBrands] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentTestimonial = testimonials[currentIndex];

  const handleClick = (index) => {
    setCurrentIndex(index);
  }
  useEffect(()=>{
    FetchSanityData("testimonials", setTestimonials);
    FetchSanityData("brands", setBrands);    
  }, [])


  return (
    <>
      {testimonials.length > 0 && (
        <>
          <div className="app__testimonial-item app__flex">
            <img src={urlFor(currentTestimonial.imgurl)} alt="testimonial" />
            <div className="app__testimonial-content">
              <p className="p-text">{currentTestimonial.feedback}</p>
              <div>
                <h4 className="bold-text">{currentTestimonial.name}</h4>
                <h5 className="p-text">{currentTestimonial.company}</h5>
              </div>
            </div>
          </div>

          <div className="app__testimonial-btns app__flex">
            <div className="app__flex" onClick={()=> handleClick(currentIndex === 0 ? testimonials.length - 1 : currentIndex -1)}>
              <HiChevronLeft />
            </div>

            <div className="app__flex" onClick={()=> handleClick(currentIndex === testimonials.length - 1 ? 0 : currentIndex + 1)}>
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

export default AppWrap(MotionWrap(Testimonial, "app__testimonial"), "testimonials", "app__testimonial")