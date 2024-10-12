import {createString} from "../functions/createString"
import {createImage} from "../functions/createImage"

export default {
    name:'testimonials',
    title:'Testimonials',
    type: 'document',
    fields:[
        createString("Name"),
        createString("Company"),
        createImage("ImgUrl"),
        createString("Feedback", "text")
    ]
}