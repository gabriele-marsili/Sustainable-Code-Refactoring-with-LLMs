"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convert = convert;
const dividers = [
    [3, "Pling"],
    [5, "Plang"],
    [7, "Plong"],
];
function convert(input) {
    let result = "";
    // Using a for...of loop is often more readable and can sometimes be slightly
    // more efficient than a traditional for loop with an index, as it avoids
    // the overhead of index lookups.
    for (const [divider, sound] of dividers) {
        if (input % divider === 0) {
            result += sound;
        }
    }
    // Using a ternary operator is concise and efficient for this conditional return.
    // The logical OR (||) is already efficient for checking if `result` is empty.
    return result || input.toString();
}
