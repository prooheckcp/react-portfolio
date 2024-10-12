import {toCamelCase} from "./toCamelCase.js";

export function createImage(name) {
    return {
        name: toCamelCase(name),
        title: name,
        type: 'image',
        options: {
          hotspot: true,
        },
    }
}