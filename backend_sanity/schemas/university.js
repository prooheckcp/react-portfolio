import {createString} from "../functions/createString"
import {createImage} from "../functions/createImage"

/* Mirrors workExperience so the Credentials page can render it with the same
   timeline component. Leaving Date empty means "currently studying". */
export default {
    name: 'university',
    title: 'University',
    type: 'document',
    fields: [
        createString("Name"),
        createString("Institution"),
        createString("Starting Date", "date"),
        createString("Leaving Date", "date"),
        createString("Description", "text"),
        createImage("Img Url"),
    ],
    preview: {
        select: {title: 'name', subtitle: 'institution', media: 'imgUrl'}
    }
}
