import React, {useState, useEffect} from 'react';
import {motion} from 'framer-motion';
import {FaFileAlt, FaMicrophoneAlt, FaChalkboardTeacher, FaUsers, FaLandmark, FaCrown, FaUserFriends} from 'react-icons/fa';
import {FiExternalLink} from 'react-icons/fi';

import {urlFor} from '../../client';
// @ts-ignore
import FetchSanityData from '../../functions/FetchSanityData.ts';
// @ts-ignore
import {fileUrlFor} from '../../functions/fileUrlFor.ts';

import './Research.scss';

const MONTH_LIST : Array<string> = ["January","February","March","April","May","June","July","August","September","October","November","December"];

/* Sanity date fields arrive as "YYYY-MM-DD". Parsing those through `new Date`
   treats them as UTC midnight, so a visitor west of UTC reads the day before -
   hence taking the parts literally. */
const formatDate = (value?: string) => {
  const parts = /^(\d{4})-(\d{2})-(\d{2})/.exec(value ?? '');

  if(!parts)
    return null;

  const [, year, month] = parts;

  return `${MONTH_LIST[Number(month) - 1]} ${year}`;
}

/* Newest first. Entries with no date sink to the bottom rather than jumping to
   the top on an invalid Date. */
const byDateDesc = (field : string) => (a, b) => {
  const toTime = (value?: string) => {
    if(!value)
      return null;

    const time = new Date(value).getTime();
    return Number.isNaN(time) ? null : time;
  };

  const timeA = toTime(a?.[field]);
  const timeB = toTime(b?.[field]);

  if(timeA === null && timeB === null) return 0;
  if(timeA === null) return 1;
  if(timeB === null) return -1;

  return timeB - timeA;
};

const SectionHeading = ({icon, accent}) => (
  <h2 className="research__heading">
    <span className="research__heading-icon">{icon}</span>
    <span>{accent}</span>
  </h2>
);

/* A block of prose (an abstract or a description) can run long enough to
   dominate the card, so anything past a rough two-line estimate starts
   collapsed. There's no DOM measurement here - just a character-count
   threshold - since the exact wrap point depends on the viewport and this
   only has to be roughly right, not pixel-exact. */
const ABSTRACT_CLAMP_THRESHOLD = 220;

const ExpandableText = ({text, expandLabel = 'Read more', collapseLabel = 'Show less'}) => {
  const [expanded, setExpanded] = useState(false);

  if(!text)
    return null;

  const isLong = text.length > ABSTRACT_CLAMP_THRESHOLD;

  return (
    <div className="research-card__desc-wrap">
      <p className={`research-card__desc ${isLong && !expanded ? 'research-card__desc--clamped' : ''}`}>
        {text}
      </p>

      {isLong &&
        <button
          type="button"
          className="research-card__expand"
          onClick={() => setExpanded((value) => !value)}
        >
          {expanded ? collapseLabel : expandLabel}
        </button>
      }
    </div>
  );
}

/* Author order in the byline doesn't say whether this was your paper or one
   you contributed to, so that's tracked as its own field rather than parsed
   out of the authors string. Renders nothing when the field has never been
   set, rather than defaulting every paper to "Co-Author". */
const AuthorBadge = ({isFirstAuthor}) => {
  if(typeof isFirstAuthor !== 'boolean')
    return null;

  return isFirstAuthor
    ? <span className="research-card__role research-card__role--lead"><FaCrown /> First Author</span>
    : <span className="research-card__role"><FaUserFriends /> Co-Author</span>;
}

/* All three sections share a shape: title, an author-role badge, one or two
   icon-led meta lines, a collapsible blurb, optional tags, a copyright note,
   and a row of links. `metaLines` is a list rather than one joined string so
   authors and venue/conference render as visually separate rows, each with
   its own icon. `links` is a list because a paper alone can carry up to
   three: the publisher page, a self-hosted PDF, and the code repo. */
const ResearchCard = ({item, index, metaLines, tags, links}) => (
  <motion.article
    className="research-card"
    initial={{opacity: 0, y: 14}}
    whileInView={{opacity: 1, y: 0}}
    viewport={{once: true, amount: 0.2}}
    transition={{duration: 0.32, delay: Math.min(index, 5) * 0.05, ease: [0.2, 0.8, 0.2, 1]}}
  >
    {item.imgUrl &&
      <div className="research-card__logo">
        <img src={urlFor(item.imgUrl).width(160).auto('format').url()} alt="" />
      </div>
    }

    <div className="research-card__body">
      <h3 className="research-card__title">{item.title}</h3>

      <AuthorBadge isFirstAuthor={item.isFirstAuthor} />

      {metaLines.map(({icon, text}, lineIndex) =>
        <p className="research-card__meta-line" key={lineIndex}>
          <span className="research-card__meta-icon">{icon}</span>
          {text}
        </p>
      )}

      <ExpandableText text={item.description} />
      <ExpandableText text={item.abstract} expandLabel="Read full abstract" />

      {tags?.length > 0 &&
        <ul className="research-card__tags">
          {tags.map((tag) => <li key={tag} className="research-card__tag">{tag}</li>)}
        </ul>
      }

      {item.copyrightNotice && <p className="research-card__notice">{item.copyrightNotice}</p>}

      {links.length > 0 &&
        <div className="research-card__links">
          {links.map(({label, href}) =>
            <a key={label} className="research-card__link" href={href} target="_blank" rel="noreferrer">
              {label} <FiExternalLink />
            </a>
          )}
        </div>
      }
    </div>
  </motion.article>
);

const Research : React.FC = () => {
  const [papers, setPapers] = useState<Array<any>>([]);
  const [conferences, setConferences] = useState<Array<any>>([]);
  const [workshops, setWorkshops] = useState<Array<any>>([]);

  useEffect(() => {
    FetchSanityData("researchPapers", (data) => setPapers([...data].sort(byDateDesc("publicationDate"))));
    FetchSanityData("conferences", (data) => setConferences([...data].sort(byDateDesc("date"))));
    FetchSanityData("workshops", (data) => setWorkshops([...data].sort(byDateDesc("date"))));
  }, []);

  const hasNothing =
    papers.length === 0 && conferences.length === 0 && workshops.length === 0;

  /* Drops the fields that are empty so a joined line never renders a stray
     separator for data that isn't there. */
  const joinOf = (...parts : Array<string | null>) => parts.filter(Boolean).join(' · ');

  /* Builds one meta line, or nothing if every part behind it is empty - so a
     paper with no location yet doesn't leave a bare icon on the card. */
  const lineOf = (icon : JSX.Element, ...parts : Array<string | null>) => {
    const text = joinOf(...parts);
    return text ? {icon, text} : null;
  };

  const metaLinesOf = (...lines : Array<{icon: JSX.Element, text: string} | null>) =>
    lines.filter(Boolean) as Array<{icon: JSX.Element, text: string}>;

  /* Drops missing links the same way, so a paper with no PDF yet just gets a
     shorter button row instead of a broken one. */
  const linksOf = (...parts : Array<{label: string, href: string} | false | null | undefined>) =>
    parts.filter(Boolean) as Array<{label: string, href: string}>;

  return (
    <div className="research">
      <div className="research__inner">
        <header className="research__hero">
          <h1 className="research__title">My <span>Research</span></h1>
          <p className="research__lead">
            Papers, conferences, and workshops from my graduate work on large
            language models and vision models.
          </p>
        </header>

        {hasNothing &&
          <p className="research__empty">Nothing here yet. Add entries in the Sanity studio.</p>
        }

        {papers.length > 0 &&
          <section className="research__section">
            <SectionHeading icon={<FaFileAlt />} accent="Research Papers" />
            <div className="research__grid">
              {papers.map((item, index) =>
                <ResearchCard
                  key={`paper-${item.title}-${index}`}
                  item={item}
                  index={index}
                  metaLines={metaLinesOf(
                    item.authors ? {icon: <FaUsers />, text: item.authors} : null,
                    lineOf(<FaLandmark />, item.venue, item.location, formatDate(item.publicationDate))
                  )}
                  tags={item.keywords}
                  links={linksOf(
                    item.paperLink && {label: 'Read the paper', href: item.paperLink},
                    fileUrlFor(item.pdfFile) && {label: 'View PDF', href: fileUrlFor(item.pdfFile)},
                    item.codeLink && {label: 'View code', href: item.codeLink}
                  )}
                />
              )}
            </div>
          </section>
        }

        {conferences.length > 0 &&
          <section className="research__section">
            <SectionHeading icon={<FaMicrophoneAlt />} accent="Conferences" />
            <div className="research__grid">
              {conferences.map((item, index) =>
                <ResearchCard
                  key={`conf-${item.title}-${index}`}
                  item={item}
                  index={index}
                  metaLines={metaLinesOf(
                    item.role ? {icon: <FaUsers />, text: item.role} : null,
                    lineOf(<FaLandmark />, item.location, formatDate(item.date))
                  )}
                  links={linksOf(item.link && {label: 'View details', href: item.link})}
                />
              )}
            </div>
          </section>
        }

        {workshops.length > 0 &&
          <section className="research__section">
            <SectionHeading icon={<FaChalkboardTeacher />} accent="Workshops" />
            <div className="research__grid">
              {workshops.map((item, index) =>
                <ResearchCard
                  key={`workshop-${item.title}-${index}`}
                  item={item}
                  index={index}
                  metaLines={metaLinesOf(
                    item.organizer ? {icon: <FaUsers />, text: item.organizer} : null,
                    lineOf(<FaLandmark />, item.location, formatDate(item.date))
                  )}
                  links={linksOf(item.link && {label: 'View details', href: item.link})}
                />
              )}
            </div>
          </section>
        }
      </div>
    </div>
  );
}

export default Research;
