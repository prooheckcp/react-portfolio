import categories from "../data/categories.json"

export default {
    name: "categories",
    title: "Categories",
    type: "string",
    options: {
        list: categories,
        layout: "dropdown"
    }
};