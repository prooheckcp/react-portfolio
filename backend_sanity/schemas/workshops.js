import {createString} from "../functions/createString"
import {createImage} from "../functions/createImage"

/* Workshops attended, run, or contributed to. */
export default {
    name: 'workshops',
    title: 'Workshops',
    type: 'document',
    fields: [
        createString("Title"),
        createString("Organizer"),
        createString("Location"),
        createString("Description", "text"),
        createString("Date", "date"),
        createString("Link", "url"),
        createImage("Img Url"),
    ],
    preview: {
        select: {title: 'title', subtitle: 'organizer', media: 'imgUrl'}
    }
}
