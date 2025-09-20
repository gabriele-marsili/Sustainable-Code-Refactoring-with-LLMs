"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parse = parse;
function parse(phrase) {
    const endIndex = phrase.indexOf(':');
    const relevantPart = endIndex >= 0 ? phrase.slice(0, endIndex) : phrase;
    return relevantPart
        .split(/\W+/)
        .filter(Boolean)
        .map((word) => word[0].toUpperCase())
        .join('');
}
