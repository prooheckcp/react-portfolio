import {createString} from "../functions/createString"
import {createImage} from "../functions/createImage"

export default{
    name:'skills',
    title:'Skills',
    type: 'document',
    fields:[
        createString("Name"),
        createImage("Icon"),
        createString("Section"),
        createString("Level", "number"),
    ]
}