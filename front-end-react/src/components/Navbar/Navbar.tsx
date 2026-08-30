import React, {useState} from 'react';
import './Navbar.scss';
import {images} from '../../constants';
import {Link, useLocation} from 'react-router-dom';
import {HashLink} from 'react-router-hash-link';
//@ts-ignore
import HamburgerMenu from './HamburgerMenu.tsx';
//@ts-ignore
import {NAV_ITEMS} from '../../constants/navigation.ts';

const Navbar = () => {
  const [toggle, setToggle] = useState<boolean>(false);
  const {pathname} = useLocation();

  return (
    <nav className="app__navbar">
      <div className="app__navbar-logo">
        <Link to="/">
          <img src={images.logo} alt="logo" />
        </Link>
      </div>

      <ul className="app__navbar-links">
        {NAV_ITEMS.map(item => {
          const isActive = item.kind !== 'route'
            ? false
            : item.target === '/'
              ? pathname === '/'
              : pathname.startsWith(item.target);

          return (
            <li className="app__flex p-text" key={`link-${item.label}`}>
              <div />
              {item.kind === 'route'
                ? <Link to={item.target} className={isActive ? 'is-active' : ''}>{item.label}</Link>
                : <HashLink to={`/#${item.target}`}>{item.label}</HashLink>
              }
            </li>
          );
        })}
      </ul>

      <HamburgerMenu setToggle={setToggle} toggle={toggle} items={NAV_ITEMS}/>
    </nav>
  )
}

export default Navbar
