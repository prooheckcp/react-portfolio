import tags from "../data/tags.json"

export default {
    name: "programmingLanguages",
    title: "Programming Languages",
    type: "string",
    options: {
        list: tags,
        layout: "dropdown"
    }
};