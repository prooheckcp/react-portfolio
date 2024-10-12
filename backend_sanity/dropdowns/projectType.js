import projectType from "../data/projectType.json"

export default {
    name: "projectType",
    title: "Type of project",
    type: "string",
    options: {
        list: projectType,
        layout: "dropdown"
    }
};