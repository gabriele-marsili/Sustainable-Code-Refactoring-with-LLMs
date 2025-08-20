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
    const incomingMessage = message.replace(/\s/g, ''); // remove all whitespaces
    let responseIndex = MessageType.other; // set other as default
    // If empty, set to nothing
    if (!incomingMessage) {
        responseIndex = MessageType.nothing;
    }
    // If question, set to question
    if (incomingMessage.slice(-1) === '?') {
        responseIndex = MessageType.question;
    }
    // If yelling, if current index is already set previously, set to yell_question. Otherwise, set to yell
    if (incomingMessage.toUpperCase() === incomingMessage &&
        incomingMessage.toLowerCase() !== incomingMessage) {
        responseIndex = responseIndex ? MessageType.yell_quesion : MessageType.yell;
    }
    // return the corresponding response based on the responseIndex
    return BobResponse[responseIndex];
}
