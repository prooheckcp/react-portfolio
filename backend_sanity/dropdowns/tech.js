import tech from "../data/tech.json"

export default {
    name: "tech",
    title: "Tech",
    type: "string",
    options: {
        list: tech,
        layout: "dropdown"
    }
};