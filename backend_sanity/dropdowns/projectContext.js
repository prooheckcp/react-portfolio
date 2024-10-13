import projectContext from "../data/projectContext.json"

export default {
    name: "projectContext",
    title: "Project Context",
    type: "string",
    options: {
        list: projectContext,
        layout: "dropdown"
    }
};