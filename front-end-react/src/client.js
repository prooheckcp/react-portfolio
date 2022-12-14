import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

import keys from './keys.json';

export const client = sanityClient({
    projectId: keys.REACT_APP_SANITY_PROJECT_ID,
    dataset: 'production',
    apiVersion: '2022-02-01',
    useCdn: true,
    token: keys.REACT_APP_SANITY_TOKEN,
    ignoreBrowserTokenWarning: true
})

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);