import React, {useState, useEffect} from 'react';
import {motion} from 'framer-motion';
import {FaGraduationCap, FaCertificate, FaTrophy} from 'react-icons/fa';
import {FiExternalLink} from 'react-icons/fi';

import {urlFor} from '../../client';
// @ts-ignore
import FetchSanityData from '../../functions/FetchSanityData.ts';
// @ts-ignore
import getFormatedDateLength from '../../functions/getFormatedDateLength.ts';

import './Credentials.scss';

const MONTH_LIST : Array<string> = ["January","February","March","April","May","June","July","August","September","October","November","December"];

const formatAwarded = (value?: string) => {
  if(!value)
    return null;

  const date = new Date(value);

  if(Number.isNaN(date.getTime()))
    return null;

  return `${MONTH_LIST[date.getMonth()]} ${date.getFullYear()}`;
}

/* Most recent first, matching how the experience timeline reads.
   Sanity returns documents in no guaranteed order, so sort explicitly.
   Entries without a start date sink to the bottom rather than jumping to
   the top on an invalid Date. */
const byStartDateDesc = (a, b) => {
  const toTime = (value?: string) => {
    if(!value)
      return null;

    const time = new Date(value).getTime();
    return Number.isNaN(time) ? null : time;
  };

  const timeA = toTime(a?.startingDate);
  const timeB = toTime(b?.startingDate);

  if(timeA === null && timeB === null) return 0;
  if(timeA === null) return 1;
  if(timeB === null) return -1;

  return timeB - timeA;
};

const SectionHeading = ({icon, title, accent}) => (
  <h2 className="credentials__heading">
    <span className="credentials__heading-icon">{icon}</span>
    {title} <span>{accent}</span>
  </h2>
);

/* Awards and certificates share a shape: title, issuer, blurb, verify link. */
const CredentialCard = ({item, index}) => (
  <motion.article
    className="credential-card"
    initial={{opacity: 0, y: 14}}
    whileInView={{opacity: 1, y: 0}}
    viewport={{once: true, amount: 0.2}}
    transition={{duration: 0.32, delay: Math.min(index, 5) * 0.05, ease: [0.2, 0.8, 0.2, 1]}}
  >
    {item.imgUrl &&
      <div className="credential-card__logo">
        <img src={urlFor(item.imgUrl).width(160).auto('format').url()} alt="" />
      </div>
    }

    <div className="credential-card__body">
      <h3 className="credential-card__title">{item.title}</h3>

      <p className="credential-card__meta">
        {item.issuer}
        {item.issuer && formatAwarded(item.dateReceived) ? ' · ' : ''}
        {formatAwarded(item.dateReceived)}
      </p>

      {item.description && <p className="credential-card__desc">{item.description}</p>}

      {item.credentialLink &&
        <a
          className="credential-card__verify"
          href={item.credentialLink}
          target="_blank"
          rel="noreferrer"
        >
          Verify credential <FiExternalLink />
        </a>
      }
    </div>
  </motion.article>
);

const Credentials : React.FC = () => {
  const [university, setUniversity] = useState<Array<any>>([]);
  const [certificates, setCertificates] = useState<Array<any>>([]);
  const [awards, setAwards] = useState<Array<any>>([]);

  useEffect(() => {
    FetchSanityData("university", (data) => setUniversity([...data].sort(byStartDateDesc)));
    FetchSanityData("certificates", setCertificates);
    FetchSanityData("awards", setAwards);
  }, []);

  const hasNothing =
    university.length === 0 && certificates.length === 0 && awards.length === 0;

  return (
    <div className="credentials">
      <div className="credentials__inner">
        <header className="credentials__hero">
          <h1 className="credentials__title">My <span>Credentials</span></h1>
          <p className="credentials__lead">
            Education, certifications, and awards — with links to verify each one.
          </p>
        </header>

        {hasNothing &&
          <p className="credentials__empty">Nothing here yet. Add entries in the Sanity studio.</p>
        }

        {university.length > 0 &&
          <section className="credentials__section">
            <SectionHeading icon={<FaGraduationCap />} title="" accent="Education" />

            <div className="credentials-timeline">
              {university.map((entry, index) => {
                const {start, final, duration} = getFormatedDateLength(entry.startingDate, entry.leavingDate);

                return (
                  <motion.article
                    className="credentials-timeline__item"
                    key={`${entry.name}-${index}`}
                    initial={{opacity: 0, y: 14}}
                    whileInView={{opacity: 1, y: 0}}
                    viewport={{once: true, amount: 0.2}}
                    transition={{duration: 0.32, ease: [0.2, 0.8, 0.2, 1]}}
                  >
                    {entry.imgUrl &&
                      <div className="credentials-timeline__logo">
                        <img src={urlFor(entry.imgUrl).width(160).auto('format').url()} alt="" />
                      </div>
                    }

                    <div className="credentials-timeline__body">
                      {entry.startingDate &&
                        <p className="credentials-timeline__date">{start} – {final} · {duration}</p>
                      }
                      <h3 className="credentials-timeline__name">{entry.name}</h3>
                      {entry.institution && <p className="credentials-timeline__institution">{entry.institution}</p>}
                      {entry.description && <p className="credentials-timeline__desc">{entry.description}</p>}
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </section>
        }

        {certificates.length > 0 &&
          <section className="credentials__section">
            <SectionHeading icon={<FaCertificate />} title="" accent="Certificates" />
            <div className="credentials__grid">
              {certificates.map((item, index) =>
                <CredentialCard item={item} index={index} key={`cert-${item.title}-${index}`} />
              )}
            </div>
          </section>
        }

        {awards.length > 0 &&
          <section className="credentials__section">
            <SectionHeading icon={<FaTrophy />} title="" accent="Awards" />
            <div className="credentials__grid">
              {awards.map((item, index) =>
                <CredentialCard item={item} index={index} key={`award-${item.title}-${index}`} />
              )}
            </div>
          </section>
        }
      </div>
    </div>
  );
}

export default Credentials;
