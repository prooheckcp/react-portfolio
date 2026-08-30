import React from 'react';
import {BsGithub, BsLinkedin, BsYoutube} from 'react-icons/bs';
import {FaXTwitter} from 'react-icons/fa6';
// @ts-ignore
import {SOCIALS, OWNER_NAME} from '../constants/socials.ts';
import './SiteFooter.scss';

const ICONS = {
  x: <FaXTwitter />,
  github: <BsGithub />,
  linkedin: <BsLinkedin />,
  youtube: <BsYoutube />,
};

const SiteFooter = () => {
  const currentYear : number = (new Date()).getFullYear();

  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__socials">
          {SOCIALS.map((social) =>
            <a
              key={social.key}
              href={social.href}
              target="_blank"
              rel="noreferrer"
              className="site-footer__social"
              aria-label={social.label}
              title={social.label}
            >
              {ICONS[social.key]}
            </a>
          )}
        </div>

        <p className="site-footer__rights">
          @{currentYear} {OWNER_NAME} · All rights reserved
        </p>
      </div>
    </footer>
  );
};

export default SiteFooter;
