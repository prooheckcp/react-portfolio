import {createString} from "../functions/createString"
import {createImage} from "../functions/createImage"

export default {
    name:'workExperience',
    title:'Work Experience',
    type:'document',
    fields:[
        createString("Name"),
        createString("Company"),
        createString("Starting Date", "date"),
        createString("Leaving Date", "date"),
        createImage("Img Url"),
        createString("Desc", "text"),
        createString("Tools Used"),
    ]
}