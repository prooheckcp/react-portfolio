import tags from "../data/tags.json"

export default {
    name: "tags",
    title: "Tags",
    type: "string",
    options: {
        list: tags,
        layout: "dropdown"
    }
};