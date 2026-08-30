/* One source of truth for the social links: they were previously duplicated
   across the fixed rail and the contact page, which is how a wrong LinkedIn
   URL crept in. */
export type Social = {
    key: string;
    label: string;
    href: string;
};

export const SOCIALS : Array<Social> = [
    {key: 'x',        label: 'X',        href: 'https://twitter.com/Prooheckcp'},
    {key: 'github',   label: 'GitHub',   href: 'https://github.com/prooheckcp'},
    {key: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/vasco-soares-564682194/'},
    {key: 'youtube',  label: 'YouTube',  href: 'https://www.youtube.com/prooheckcp'},
];

export const OWNER_NAME : string = 'Vasco Soares';
