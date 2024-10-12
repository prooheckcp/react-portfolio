import {createString} from "../functions/createString"

export default {
    name:'contact',
    title:'Contact',
    type:'document',
    fields:[
        createString("Name"),
        createString("Email"),
        createString("Message", "text")
    ]
}