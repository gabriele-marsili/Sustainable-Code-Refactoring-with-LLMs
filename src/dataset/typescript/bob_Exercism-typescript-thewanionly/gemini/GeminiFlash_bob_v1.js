"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hey = hey;
const BobResponse = [
    'Whatever.',
    'Sure.',
    'Whoa, chill out!',
    `Calm down, I know what I'm doing!`,
    'Fine. Be that way!'
];
var MessageType;
(function (MessageType) {
    MessageType[MessageType["other"] = 0] = "other";
    MessageType[MessageType["question"] = 1] = "question";
    MessageType[MessageType["yell"] = 2] = "yell";
    MessageType[MessageType["yell_quesion"] = 3] = "yell_quesion";
    MessageType[MessageType["nothing"] = 4] = "nothing";
})(MessageType || (MessageType = {}));
/**
 * Checks if a string contains at least one letter and all its letters are uppercase.
 * This function is an optimized replacement for `s.toUpperCase() === s && s.toLowerCase() !== s`.
 * It avoids creating new strings for case conversion, reducing memory allocations and CPU cycles.
 * @param s The string to check.
 * @returns True if the string meets the "yelling" criteria, false otherwise.
 */
function isStringYelling(s) {
    let hasLetters = false;
    let hasLowercase = false;
    if (!s) {
        return false; // An empty string cannot be yelling
    }
    // Iterate over the string character by character
    for (let i = 0; i < s.length; i++) {
        const charCode = s.charCodeAt(i);
        // Check if character is a lowercase English letter (a-z)
        if (charCode >= 97 /* 'a' */ && charCode <= 122 /* 'z' */) {
            hasLowercase = true;
            hasLetters = true;
            // If a lowercase letter is found, the string cannot be all uppercase.
            // We can stop checking for lowercase and just confirm if it has any letters at all.
        }
        else if (charCode >= 65 /* 'A' */ && charCode <= 90 /* 'Z' */) {
            // Check if character is an uppercase English letter (A-Z)
            hasLetters = true;
        }
    }
    // A string is "yelling" if it contains at least one letter AND it does NOT contain any lowercase letters.
    return hasLetters && !hasLowercase;
}
function hey(message) {
    // The original behavior dictates removing all whitespace first.
    // This operation is performed once and its result (incomingMessage) is then used for all checks.
    const incomingMessage = message.replace(/\s/g, '');
    // Pre-calculate conditions to avoid redundant checks and complex state management
    const isEmpty = !incomingMessage;
    const isQuestion = incomingMessage.endsWith('?'); // Use endsWith for clarity and efficiency
    const isYelling = isStringYelling(incomingMessage); // Use the optimized helper
    // Use an if-else if chain for clear priority and early exit,
    // preventing unnecessary checks and assignments to `responseIndex`.
    if (isEmpty) {
        return BobResponse[MessageType.nothing];
    }
    else if (isYelling && isQuestion) {
        // "Yell & Question" takes highest precedence among non-empty messages
        return BobResponse[MessageType.yell_quesion];
    }
    else if (isYelling) {
        // "Yell" comes next
        return BobResponse[MessageType.yell];
    }
    else if (isQuestion) {
        // "Question" comes after "Yell" and "Yell & Question"
        return BobResponse[MessageType.question];
    }
    else {
        // Default "Other" response
        return BobResponse[MessageType.other];
    }
}
