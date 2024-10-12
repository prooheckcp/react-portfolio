import programmingLanguages from "../data/programmingLanguages.json"

export default {
    name: "programmingLanguages",
    title: "Programming Languages",
    type: "string",
    options: {
        list: programmingLanguages,
        layout: "dropdown"
    }
};