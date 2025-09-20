"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parse = void 0;
const parse = (phrase) => {
    var _a;
    return ((_a = phrase
        .match(/\b\w/g)) === null || _a === void 0 ? void 0 : _a.map(char => char.toUpperCase()).join('')) || '';
};
exports.parse = parse;
