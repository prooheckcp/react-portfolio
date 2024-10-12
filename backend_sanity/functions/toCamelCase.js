export function toCamelCase(str) {
    return str
        .split(' ') // Split the string by spaces
        .map((word, index) => {
            // Convert the first word to lowercase and capitalize the rest
            if (index === 0) {
                return word.toLowerCase(); // First word in lowercase
            }
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(); // Capitalize subsequent words
        })
        .join(''); // Join all words together without spaces
}