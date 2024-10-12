import {toCamelCase} from "./toCamelCase.js";

export function createArray(name, content) {
    return {
        name: toCamelCase(name),
        title: name,
        type:'array',
        of: [
            content
        ]
    }
}