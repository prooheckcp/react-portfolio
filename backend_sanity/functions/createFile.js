import {toCamelCase} from "./toCamelCase.js";

export function createFile(name) {
    return {
        name: toCamelCase(name),
        title: name,
        type: 'file',
    }
}
