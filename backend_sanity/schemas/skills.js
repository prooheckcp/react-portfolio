import {createString} from "../functions/createString"
import {createImage} from "../functions/createImage"
import categories from "../dropdowns/categories"

export default{
    name:'skills',
    title:'Skills',
    type: 'document',
    fields:[
        createString("Name"),
        createImage("Icon"),
        categories,
        createString("Level", "number"),
    ]
}