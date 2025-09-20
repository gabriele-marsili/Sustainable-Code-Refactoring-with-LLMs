"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parse = parse;
function parse(phrase) {
    const endIndex = phrase.indexOf(':');
    const relevantPart = endIndex >= 0 ? phrase.slice(0, endIndex) : phrase;
    return Array.from(relevantPart.matchAll(/\b\w/g), (match) => match[0].toUpperCase()).join('');
}
