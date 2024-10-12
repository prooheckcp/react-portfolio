import {createString} from "../functions/createString"
import {createImage} from "../functions/createImage"

export default{
    name:'brands',
    title:'Brands',
    type: 'document',
    fields:[
        createString("Name"),
        createImage("Img Url")
    ]
}