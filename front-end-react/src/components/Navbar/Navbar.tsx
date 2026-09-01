import React, {useEffect, useState} from 'react';
import './Navbar.scss';
import {images} from '../../constants';
import {Link, useLocation} from 'react-router-dom';
import {HashLink} from 'react-router-hash-link';
//@ts-ignore
import HamburgerMenu from './HamburgerMenu.tsx';
//@ts-ignore
import {NAV_ITEMS, isNavItemActive} from '../../constants/navigation.ts';

const Navbar = () => {
  const [toggle, setToggle] = useState<boolean>(false);
  const {pathname} = useLocation();

  /* A route change - including the browser's back/forward buttons, which
     don't run a link's onClick - should always close the drawer. Otherwise
     it's possible to navigate "through" it and land on the new page with
     the overlay still covering the screen. */
  useEffect(() => {
    setToggle(false);
  }, [pathname]);

  return (
    <nav className="app__navbar">
      <div className="app__navbar-logo">
        <Link to="/">
          <img src={images.logo} alt="logo" />
        </Link>
      </div>

      <ul className="app__navbar-links">
        {NAV_ITEMS.map(item =>
          <li className="app__flex p-text" key={`link-${item.label}`}>
            <div />
            {item.kind === 'route'
              ? <Link to={item.target} className={isNavItemActive(item, pathname) ? 'is-active' : ''}>{item.label}</Link>
              : <HashLink to={`/#${item.target}`}>{item.label}</HashLink>
            }
          </li>
        )}
      </ul>

      <HamburgerMenu setToggle={setToggle} toggle={toggle} items={NAV_ITEMS} pathname={pathname}/>
    </nav>
  )
}

export default Navbar
