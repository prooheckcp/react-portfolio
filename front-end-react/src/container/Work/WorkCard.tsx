import React from 'react';
import {Link} from 'react-router-dom';
import {urlFor} from '../../client';
//@ts-ignore
import {getSkill} from '../../functions/GetSkill.ts';
//@ts-ignore
import {isInDevelopment} from '../../functions/workStatus.ts';
import {AiFillStar} from 'react-icons/ai';

const StackIcons = ({items, group, prefix}) => {
    if(!items)
        return null;

    const icons = [...new Set(items)]
        .map((value) => ({value, icon: getSkill(group, value)?.icon}))
        .filter((entry) => entry.icon);

    if(icons.length === 0)
        return null;

    return (
        <>
            {icons.map(({value, icon}) =>
                <img key={`${prefix}${value}`} src={urlFor(icon)} alt={value} title={value} />
            )}
        </>
    );
}

const WorkCard = ({stars, ...work}) => {
    // Sanity data contains repeats (e.g. "MultiPlayer" twice), so dedupe
    // before rendering or React sees duplicate keys.
    const tags = [...new Set(
        (work.tags ?? []).filter((tag) => tag && tag.toLowerCase().trim() !== "all")
    )];

    return (
        <Link to={`/work/${work.id}`} className="work-card" key={work.id}>
            <div className="work-card__media">
                <img src={urlFor(work.imgUrl)} alt={work.name ?? work.title} loading="lazy" />

                {isInDevelopment(work) &&
                    <span className="work-card__wip">
                        <span className="work-card__wip-dot" />
                        In development
                    </span>
                }

                {/* Hidden at zero: a "0 stars" chip is noisier than no chip. */}
                {stars > 0 &&
                    <span className="work-card__stars" title={`${stars} stars on GitHub`}>
                        <AiFillStar /> {stars}
                    </span>
                }

                <div className="work-card__stack">
                    <StackIcons items={work.languages} group="Programming Languages" prefix="lang" />
                    <StackIcons items={work.tech} group="Tech" prefix="tech" />
                </div>
            </div>

            <div className="work-card__body">
                <h4 className="work-card__title">{work.title}</h4>
                <p className="work-card__headline">{work.headline}</p>

                {tags.length > 0 &&
                    <ul className="work-card__tags">
                        {tags.map((tag) => <li key={tag} className="work-card__tag">{tag}</li>)}
                    </ul>
                }
            </div>
        </Link>
    );
}

export default WorkCard;
