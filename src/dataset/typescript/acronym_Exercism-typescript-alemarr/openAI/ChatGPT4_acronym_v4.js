"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parse = void 0;
const parse = (phrase) => (phrase.match(/\b\w/g) || []).map(char => char.toUpperCase()).join('');
exports.parse = parse;
