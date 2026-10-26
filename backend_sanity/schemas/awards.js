import {createString} from "../functions/createString"
import {createImage} from "../functions/createImage"
import awardResult from "../dropdowns/awardResult"

export default {
    name: 'awards',
    title: 'Awards',
    type: 'document',
    fields: [
        createString("Title"),
        createString("Issuer"),
        awardResult,
        createString("Description", "text"),
        createString("Date Received", "date"),
        createString("Credential Link", "url"),
        createImage("Img Url"),
    ],
    preview: {
        select: {title: 'title', subtitle: 'issuer', media: 'imgUrl'}
    }
}
