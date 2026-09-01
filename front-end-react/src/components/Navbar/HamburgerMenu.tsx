import React, {useEffect} from 'react';
import {createPortal} from 'react-dom';
import {HiMenuAlt4, HiX} from 'react-icons/hi';
import {AnimatePresence, motion} from 'framer-motion';
import {Link} from 'react-router-dom';
import {HashLink} from 'react-router-hash-link';
//@ts-ignore
import {isNavItemActive} from '../../constants/navigation.ts';

const HamburgerMenu = ({setToggle, toggle, items, pathname}) => {
  /* Body scroll lock while the drawer is open, and Escape closes it - both
     expected behaviors for a full-screen overlay, and easy to miss on mobile
     where there's no obvious "click outside" until the backdrop is added. */
  useEffect(() => {
    if(!toggle)
      return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (event : KeyboardEvent) => {
      if(event.key === 'Escape')
        setToggle(false);
    };

    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [toggle, setToggle]);

  return (
    <div className="app__navbar-menu">
      <button
        type="button"
        className="app__navbar-menu-trigger"
        onClick={() => setToggle(true)}
        aria-label="Open menu"
        aria-expanded={toggle}
      >
        <HiMenuAlt4 />
      </button>

      {/* Portalled to <body>: `.app__navbar` has a `backdrop-filter` for its
          glass effect, and backdrop-filter (like filter) creates a new
          containing block for `position: fixed` descendants - so without the
          portal, this drawer would be fixed relative to the 72px navbar
          instead of the viewport. */}
      {createPortal(
        <AnimatePresence>
          {toggle &&
            <motion.div
              key="backdrop"
              className="app__navbar-menu-backdrop"
              initial={{opacity: 0}}
              animate={{opacity: 1}}
              exit={{opacity: 0}}
              transition={{duration: 0.25}}
              onClick={() => setToggle(false)}
            />
          }

          {toggle &&
            <motion.div
              key="panel"
              className="app__navbar-menu-panel"
              initial={{x: '100%'}}
              animate={{x: 0}}
              exit={{x: '100%'}}
              transition={{duration: 0.32, ease: [0.2, 0.8, 0.2, 1]}}
              role="dialog"
              aria-modal="true"
            >
              <button
                type="button"
                className="app__navbar-menu-close"
                onClick={() => setToggle(false)}
                aria-label="Close menu"
              >
                <HiX />
              </button>

              <ul>
                {items.map(item =>
                  <li key={`menu-${item.label}`}>
                    {item.kind === 'route'
                      ? <Link
                          to={item.target}
                          className={isNavItemActive(item, pathname) ? 'is-active' : ''}
                          onClick={() => setToggle(false)}
                        >
                          {item.label}
                        </Link>
                      : <HashLink to={`/#${item.target}`} onClick={() => setToggle(false)}>{item.label}</HashLink>
                    }
                  </li>
                )}
              </ul>
            </motion.div>
          }
        </AnimatePresence>,
        document.body
      )}
    </div>
  )
}

export default HamburgerMenu
