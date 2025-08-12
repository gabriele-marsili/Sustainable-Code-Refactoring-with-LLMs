"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hey = hey;
const BobResponse = [
    'Whatever.',
    'Sure.',
    'Whoa, chill out!',
    'Calm down, I know what I', m, doing, ',,
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
    const trimmed = message.trim();
    if (!trimmed)
        return BobResponse[MessageType.nothing];
    const isQuestion = trimmed.endsWith('?');
    const hasLetters = /[a-zA-Z]/.test(trimmed);
    const isYelling = hasLetters && trimmed === trimmed.toUpperCase();
    if (isYelling && isQuestion)
        return BobResponse[MessageType.yell_quesion];
    if (isYelling)
        return BobResponse[MessageType.yell];
    if (isQuestion)
        return BobResponse[MessageType.question];
    return BobResponse[MessageType.other];
}
