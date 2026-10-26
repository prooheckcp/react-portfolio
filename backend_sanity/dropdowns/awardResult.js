import awardResult from "../data/awardResult.json"

export default {
    name: "result",
    title: "Result",
    type: "string",
    options: {
        list: awardResult,
        layout: "radio"
    }
};
