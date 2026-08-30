/* Single source of truth for the nav.

   The site is page-based now: each nav entry is its own route. `home` sections
   are the anchors that still live on the landing page and drive the scroll dots. */
export type NavItem = {
    label: string;
    kind: 'section' | 'route';
    target: string;
};

export const NAV_ITEMS : Array<NavItem> = [
    {label: 'home',    kind: 'route', target: '/'},
    {label: 'work',    kind: 'route', target: '/work'},
    {label: 'skills',  kind: 'route', target: '/skills'},
    {label: 'credentials', kind: 'route', target: '/credentials'},
    {label: 'contact', kind: 'route', target: '/contact'},
];

/* Sections that remain on the landing page, in scroll order. */
export const HOME_SECTIONS : Array<string> = ['home', 'about', 'testimonials', 'next'];
