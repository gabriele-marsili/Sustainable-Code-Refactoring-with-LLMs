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
function hey(message) {
    let hasLetter = false; // True if the message contains at least one letter (a-z, A-Z, or other cased Unicode characters)
    let hasLowercase = false; // True if the message contains at least one lowercase letter
    let hasNonWhitespace = false; // True if the message contains any character that is not a space, tab, newline, or carriage return
    // First pass: Iterate through the message to determine properties
    // This avoids creating intermediate strings like `replace(/\s/g, '')` and `toUpperCase()`/`toLowerCase()` on the whole string,
    // which are memory-intensive for long inputs.
    for (let i = 0; i < message.length; i++) {
        const char = message[i];
        // Check if the character is a whitespace character
        if (char !== ' ' && char !== '\t' && char !== '\n' && char !== '\r') {
            hasNonWhitespace = true;
            // Determine if the character is a letter (something that has an uppercase/lowercase form)
            // and if it's a lowercase letter.
            // This is robust for Unicode characters.
            if (char.toLowerCase() !== char.toUpperCase()) {
                hasLetter = true;
                if (char.toLowerCase() === char) {
                    hasLowercase = true;
                }
                // If it's a letter and not lowercase, it must be uppercase (or titlecase, etc., but treated as uppercase here)
            }
        }
    }
    // Second pass (reverse): Find the last non-whitespace character to determine if it's a question.
    // This avoids `slice(-1)` on a potentially large `incomingMessage` string.
    let isQuestion = false;
    for (let i = message.length - 1; i >= 0; i--) {
        const char = message[i];
        if (char !== ' ' && char !== '\t' && char !== '\n' && char !== '\r') {
            if (char === '?') {
                isQuestion = true;
            }
            break; // Found the last non-whitespace character, no need to check further
        }
    }
    // Determine the overall properties of the message based on the gathered flags
    const isEmpty = !hasNonWhitespace;
    // A message is considered "yelling" if it contains at least one letter, and all letters are uppercase.
    // This means hasLetter is true, and hasLowercase is false.
    const isYelling = hasLetter && !hasLowercase;
    // Apply the rules in order of precedence, directly mapping to Bob's responses.
    // This structure ensures clarity and correct priority, mimicking the original
    // logic's cascading effect more explicitly.
    if (isEmpty) {
        return BobResponse[MessageType.nothing];
    }
    else if (isQuestion && isYelling) {
        // Yelling a question
        return BobResponse[MessageType.yell_quesion];
    }
    else if (isYelling) {
        // Yelling
        return BobResponse[MessageType.yell];
    }
    else if (isQuestion) {
        // A question
        return BobResponse[MessageType.question];
    }
    else {
        // Any other message
        return BobResponse[MessageType.other];
    }
}
