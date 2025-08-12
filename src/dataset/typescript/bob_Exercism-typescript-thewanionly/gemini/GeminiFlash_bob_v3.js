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
    // Remove all whitespace characters (spaces, tabs, newlines, etc.) from the message.
    // This operation is highly optimized by JavaScript engines.
    const incomingMessage = message.replace(/\s/g, '');
    // Handle empty message immediately as it has the highest precedence.
    // This short-circuits the function, reducing unnecessary computations.
    if (!incomingMessage) {
        return BobResponse[MessageType.nothing];
    }
    // Efficiently determine message characteristics with a single pass where possible,
    // avoiding creation of intermediate strings (`toUpperCase`, `toLowerCase`) for performance
    // and reduced memory/CPU usage, contributing to lower energy consumption.
    let isQuestion = false;
    if (incomingMessage.slice(-1) === '?') {
        isQuestion = true;
    }
    let isYelling = false;
    let containsAlphabeticalChar = false;
    let containsLowercaseChar = false;
    // Iterate over the string once to check for yelling condition.
    for (let i = 0; i < incomingMessage.length; i++) {
        const charCode = incomingMessage.charCodeAt(i);
        // Check if character is an uppercase letter (A-Z)
        if (charCode >= 65 && charCode <= 90) {
            containsAlphabeticalChar = true;
        }
        // Check if character is a lowercase letter (a-z)
        else if (charCode >= 97 && charCode <= 122) {
            containsAlphabeticalChar = true;
            containsLowercaseChar = true;
            // If any lowercase alphabetical character is found, the message cannot be all uppercase,
            // so we can stop iterating early to save CPU cycles.
            break;
        }
    }
    // A message is considered "yelling" if it contains at least one alphabetical character
    // AND all its alphabetical characters are uppercase.
    if (containsAlphabeticalChar && !containsLowercaseChar) {
        isYelling = true;
    }
    // Apply the response logic based on precedence.
    // This `if/else if` structure ensures that conditions are checked in order
    // and returns immediately upon finding a match, optimizing performance.
    if (isYelling && isQuestion) {
        return BobResponse[MessageType.yell_quesion];
    }
    else if (isYelling) {
        return BobResponse[MessageType.yell];
    }
    else if (isQuestion) {
        return BobResponse[MessageType.question];
    }
    else {
        // Default response if no specific condition is met.
        return BobResponse[MessageType.other];
    }
}
