import projectType from "../dropdowns/projectType"
import programmingLanguages from "../dropdowns/programmingLanguages"
import tech from "../dropdowns/tech"
import tags from "../dropdowns/tags"
import {createString} from "../functions/createString"
import {createArray} from "../functions/createArray"

export default {
    name: 'works',
    title: 'Works',
    type: 'document',
    fields: [
      createString("Title"),
      createString("ID"),
      createString("Headline"),
      createString("Description", "text"),
      projectType,
      createString("Multiplayer", "boolean"),
      createString("Starting Date", "date"),
      createString("Final Date", "date"),
      createString("Project Link"),
      createString("Code Link"),
      createString("Trailer Link"),
      {
        name: 'imgUrl',
        title: 'ImageUrl',
        type: 'image',
        options: {
          hotspot: true,
        },
      },
      createArray("Languages", programmingLanguages),
      createArray("Tech", tech),
      createArray("Tags", tags),
      createArray("Images",{
        name:'image',
        title:'Image',
        type:'image'
      })
    ],
  };