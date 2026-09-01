import {createString} from "../functions/createString"
import {createImage} from "../functions/createImage"
import {createFile} from "../functions/createFile"
import {createArray} from "../functions/createArray"

/* Published or preprint papers. Venue is free text so it can hold anything from
   "IFIP ICEC 2026 (International Conference on Entertainment Computing)" to
   "arXiv preprint" - spell it out here since the site only ever prints it verbatim.

   Is First Author is a plain boolean rather than parsing it out of the Authors
   string, since author order alone doesn't say whether this is your paper or
   one you contributed to.

   Paper Link points at the publisher/arXiv page once one exists. Pdf File is a
   self-hosted copy for papers that are accepted but not yet published (no
   publisher link to send people to) - most publishers only allow self-archiving
   the author's own manuscript, never their typeset PDF, so this must stay the
   author's version. Copyright Notice carries whatever credit/embargo line that
   venue's self-archiving policy requires; it's free text because that
   requirement differs paper to paper and changes once a DOI is assigned. */
export default {
    name: 'researchPapers',
    title: 'Research Papers',
    type: 'document',
    fields: [
        createString("Title"),
        createString("Authors"),
        createString("Is First Author", "boolean"),
        createString("Venue"),
        createString("Location"),
        createString("Abstract", "text"),
        createString("Publication Date", "date"),
        createString("Paper Link", "url"),
        createString("Code Link", "url"),
        createFile("Pdf File"),
        createString("Copyright Notice", "text"),
        createArray("Keywords", {type: 'string'}),
        createImage("Img Url"),
    ],
    preview: {
        select: {title: 'title', subtitle: 'venue', media: 'imgUrl'}
    }
}
