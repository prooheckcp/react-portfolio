import {toCamelCase} from "./toCamelCase.js";

export function createString(name, custom) {
    return {
        name: toCamelCase(name),
        title: name,
        type: custom ?? 'string'
    }
}