import keys from '../keys.json';

const PROJECT_ID : string = keys.REACT_APP_SANITY_PROJECT_ID;
const DATASET : string = 'production';

/* `@sanity/image-url` only resolves images. A plain `file` field has no such
   builder, but Sanity's file asset IDs and CDN URL scheme are both stable and
   documented: an asset ref looks like "file-<id>-<extension>", and it always
   resolves at "https://cdn.sanity.io/files/<project>/<dataset>/<id>.<extension>". */
export function fileUrlFor(file? : {asset?: {_ref?: string}}) : string | null {
    const ref = file?.asset?._ref;

    if(!ref)
        return null;

    const match = /^file-([a-f0-9]+)-(\w+)$/.exec(ref);

    if(!match)
        return null;

    const [, id, extension] = match;

    return `https://cdn.sanity.io/files/${PROJECT_ID}/${DATASET}/${id}.${extension}`;
}
