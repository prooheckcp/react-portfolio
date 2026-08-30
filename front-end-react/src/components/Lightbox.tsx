import React, {useEffect, useCallback} from 'react';
import {motion, AnimatePresence} from 'framer-motion';
import {IoClose, IoChevronBack, IoChevronForward} from 'react-icons/io5';
import './Lightbox.scss';

const Lightbox = ({images, index, onClose, onNavigate}) => {
    const isOpen = index !== null && index >= 0;

    const goPrev = useCallback(() => {
        if(!isOpen) return;
        onNavigate((index - 1 + images.length) % images.length);
    }, [isOpen, index, images.length, onNavigate]);

    const goNext = useCallback(() => {
        if(!isOpen) return;
        onNavigate((index + 1) % images.length);
    }, [isOpen, index, images.length, onNavigate]);

    useEffect(() => {
        if(!isOpen)
            return;

        const onKey = (e) => {
            if(e.key === 'Escape') onClose();
            if(e.key === 'ArrowLeft') goPrev();
            if(e.key === 'ArrowRight') goNext();
        };

        window.addEventListener('keydown', onKey);
        // Stop the page scrolling behind the overlay.
        const previous = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        return () => {
            window.removeEventListener('keydown', onKey);
            document.body.style.overflow = previous;
        };
    }, [isOpen, onClose, goPrev, goNext]);

    return (
        <AnimatePresence>
            {isOpen &&
                <motion.div
                    className="lightbox"
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    exit={{opacity: 0}}
                    transition={{duration: 0.2}}
                    onClick={onClose}
                    role="dialog"
                    aria-modal="true"
                >
                    <button className="lightbox__close" onClick={onClose} aria-label="Close">
                        <IoClose />
                    </button>

                    {images.length > 1 &&
                        <button
                            className="lightbox__nav lightbox__nav--prev"
                            onClick={(e) => {e.stopPropagation(); goPrev();}}
                            aria-label="Previous image"
                        >
                            <IoChevronBack />
                        </button>
                    }

                    <motion.img
                        key={index}
                        className="lightbox__image"
                        src={images[index]}
                        alt=""
                        initial={{opacity: 0, scale: 0.98}}
                        animate={{opacity: 1, scale: 1}}
                        transition={{duration: 0.2}}
                        onClick={(e) => e.stopPropagation()}
                    />

                    {images.length > 1 &&
                        <button
                            className="lightbox__nav lightbox__nav--next"
                            onClick={(e) => {e.stopPropagation(); goNext();}}
                            aria-label="Next image"
                        >
                            <IoChevronForward />
                        </button>
                    }

                    {images.length > 1 &&
                        <div className="lightbox__counter">{index + 1} / {images.length}</div>
                    }
                </motion.div>
            }
        </AnimatePresence>
    );
}

export default Lightbox;
