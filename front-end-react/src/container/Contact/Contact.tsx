import React from 'react';
import {motion} from 'framer-motion';
import {SiGmail, SiWhatsapp, SiDiscord, SiGithub, SiLinkedin, SiYoutube} from 'react-icons/si';
import {FaXTwitter} from 'react-icons/fa6';
import {IoArrowForward} from 'react-icons/io5';
import './Contact.scss';

const EMAIL_ADDRESS : string = "vasco.soares.2001@gmail.com";
const PHONE_NUMBER : string = "+81 70-9160-7616";
const DISCORD : string = "prooheckcp";

const CHANNELS = [
  {
    key: 'email',
    icon: <SiGmail />,
    label: 'Email',
    value: EMAIL_ADDRESS,
    href: `mailto:${EMAIL_ADDRESS}`,
    hint: 'Best for anything detailed',
  },
  {
    key: 'whatsapp',
    icon: <SiWhatsapp />,
    label: 'WhatsApp',
    value: PHONE_NUMBER,
    href: 'https://wa.me/817091607616',
    hint: 'Quickest reply',
  },
  {
    key: 'discord',
    icon: <SiDiscord />,
    label: 'Discord',
    value: DISCORD,
    href: 'https://discordapp.com/users/469204779168432148',
    hint: 'For a casual chat',
  },
];

const SOCIALS = [
  {key: 'github',   icon: <SiGithub />,    label: 'GitHub',   href: 'https://github.com/prooheckcp'},
  {key: 'linkedin', icon: <SiLinkedin />,  label: 'LinkedIn', href: 'https://www.linkedin.com/in/vasco-soares-564682194/'},
  {key: 'twitter',  icon: <FaXTwitter />,  label: 'X',        href: 'https://twitter.com/Prooheckcp'},
  {key: 'youtube',  icon: <SiYoutube />,   label: 'YouTube',  href: 'https://www.youtube.com/prooheckcp'},
];

const Contact : React.FC = () => {
  return (
    <div className="contact-page">
      <div className="contact-page__inner">
        <motion.header
          className="contact-hero"
          initial={{opacity: 0, y: 12}}
          animate={{opacity: 1, y: 0}}
          transition={{duration: 0.4, ease: [0.2, 0.8, 0.2, 1]}}
        >
          <span className="contact-hero__eyebrow">Get in touch</span>
          <h1 className="contact-hero__title">Say <span>hello.</span></h1>
          <p className="contact-hero__lead">
            Pick whichever channel suits you best — I read all of them.
          </p>
        </motion.header>

        <div className="contact-channels">
          {CHANNELS.map((channel, index) =>
            <motion.a
              key={channel.key}
              href={channel.href}
              target={channel.key === 'email' ? undefined : '_blank'}
              rel="noreferrer"
              className="contact-card"
              initial={{opacity: 0, y: 16}}
              animate={{opacity: 1, y: 0}}
              transition={{duration: 0.35, delay: 0.06 * index, ease: [0.2, 0.8, 0.2, 1]}}
            >
              <span className={`contact-card__icon contact-card__icon--${channel.key}`}>
                {channel.icon}
              </span>

              <span className="contact-card__body">
                <span className="contact-card__label">{channel.label}</span>
                <span className="contact-card__value">{channel.value}</span>
                <span className="contact-card__hint">{channel.hint}</span>
              </span>

              <span className="contact-card__arrow"><IoArrowForward /></span>
            </motion.a>
          )}
        </div>

        <div className="contact-socials">
          <span className="contact-socials__label">Elsewhere</span>
          <div className="contact-socials__list">
            {SOCIALS.map((social) =>
              <a
                key={social.key}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="contact-social"
                aria-label={social.label}
                title={social.label}
              >
                {social.icon}
              </a>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

export default Contact;
