import {createString} from "../functions/createString"
import {createImage} from "../functions/createImage"

export default {
    name: 'press',
    title: 'Press',
    type: 'document',
    fields: [
        createString("Title"),
        createString("Outlet"),
        createString("Description", "text"),
        createString("Date Published", "date"),
        createString("Article Link", "url"),
        createImage("Img Url"),
    ],
    preview: {
        select: {title: 'title', subtitle: 'outlet', media: 'imgUrl'}
    }
}
