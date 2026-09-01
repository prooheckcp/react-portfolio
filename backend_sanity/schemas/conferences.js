import {createString} from "../functions/createString"
import {createImage} from "../functions/createImage"

/* Conferences attended or presented at. Role carries the distinction
   ("Presenter", "Attendee", "Speaker") rather than a separate boolean. */
export default {
    name: 'conferences',
    title: 'Conferences',
    type: 'document',
    fields: [
        createString("Title"),
        createString("Role"),
        createString("Location"),
        createString("Description", "text"),
        createString("Date", "date"),
        createString("Link", "url"),
        createImage("Img Url"),
    ],
    preview: {
        select: {title: 'title', subtitle: 'role', media: 'imgUrl'}
    }
}
