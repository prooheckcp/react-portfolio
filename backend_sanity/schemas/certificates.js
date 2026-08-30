import {createString} from "../functions/createString"
import {createImage} from "../functions/createImage"

export default {
    name: 'certificates',
    title: 'Certificates',
    type: 'document',
    fields: [
        createString("Title"),
        createString("Issuer"),
        createString("Description", "text"),
        createString("Date Received", "date"),
        createString("Credential Link", "url"),
        createImage("Img Url"),
    ],
    preview: {
        select: {title: 'title', subtitle: 'issuer', media: 'imgUrl'}
    }
}
