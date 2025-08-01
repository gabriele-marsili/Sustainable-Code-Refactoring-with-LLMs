"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.translate = translate;
function translate(word) {
    return word
        .split(' ')
        .map((w) => {
        let result = w.toLowerCase();
        if (/^[aeiou]{1}/.test(result)) {
            result += 'ay';
        }
        else if (/^(ch|qu|squ|th|thr|sch)/.test(result)) {
            let matches = result.match(/^(ch|qu|squ|thr|th|sch)/);
            let letterCLuster = matches[0];
            result = `${result.substring(letterCLuster.length)}${letterCLuster}ay`;
        }
        else if (/^[^aeiou]{1}/.test(result)) {
            result = `${result.substring(1)}${result[0]}ay`;
        }
        return result;
    })
        .join(' ');
}
