import {createString} from "../functions/createString"
import {createImage} from "../functions/createImage"

export default{
    name:'abouts',
    title:'Abouts',
    type: 'document',
    fields:[
        createString("Title"),
        createString("Description"),
        createImage("Img Url")
    ]
}