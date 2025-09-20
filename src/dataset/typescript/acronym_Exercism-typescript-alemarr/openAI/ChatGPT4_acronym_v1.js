"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parse = void 0;
const parse = (phrase) => {
    return phrase.replace(/[^a-zA-Z]+/g, ' ')
        .split(' ')
        .map(word => { var _a; return ((_a = word[0]) === null || _a === void 0 ? void 0 : _a.toUpperCase()) || ''; })
        .join('');
};
exports.parse = parse;
