"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parse = void 0;
const parse = (phrase) => {
    var _a;
    return ((_a = phrase
        .match(/[A-Za-z]/g)) === null || _a === void 0 ? void 0 : _a.reduce((acronym, char) => acronym + char.toUpperCase(), "")) || "";
};
exports.parse = parse;
