import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

import keys from './keys.json';

// No token: every document type this site reads is public, and the contact
// form (the only thing that ever wrote) has been removed. A token here would
// be bundled into the browser and would force credentialed CORS, which breaks
// on any port not explicitly allowlisted in Sanity.
export const client = sanityClient({
    projectId: keys.REACT_APP_SANITY_PROJECT_ID,
    dataset: 'production',
    apiVersion: '2022-02-01',
    useCdn: true
})

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);
