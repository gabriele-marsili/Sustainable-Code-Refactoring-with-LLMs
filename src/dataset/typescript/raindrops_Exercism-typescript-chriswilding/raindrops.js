"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Rainsdrops {
    convert(n) {
        let result = "";
        // Use a more efficient way to check divisibility and append strings.
        // Direct string concatenation can be less efficient for many small appends.
        // However, for a maximum of three appends as in this case,
        // the overhead of an array join might outweigh the benefits.
        // The current approach is likely already optimal for readability and performance
        // given the small, fixed number of conditions.
        // The order of checks doesn't matter for correctness,
        // and short-circuiting isn't applicable as all conditions need to be checked.
        if (n % 3 === 0) {
            result += "Pling";
        }
        if (n % 5 === 0) {
            result += "Plang";
        }
        if (n % 7 === 0) {
            result += "Plong";
        }
        // Using a ternary operator for conciseness and potentially minor efficiency gains
        // by avoiding an extra line, though runtime difference is negligible.
        return result || n.toString();
    }
}
exports.default = Rainsdrops;
