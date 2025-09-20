"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const codeA = 'A'.charCodeAt(0);
class Diamond {
    makeDiamond(maxChar) {
        const maxCharCode = maxChar.charCodeAt(0);
        const charIndex = maxCharCode - codeA;
        const size = charIndex * 2 + 1;
        const lines = [];
        for (let y = 0; y <= charIndex; y++) {
            const currentLetter = String.fromCharCode(codeA + y);
            const padding = ' '.repeat(charIndex - y);
            const middle = y === 0 ? currentLetter : `${currentLetter}${' '.repeat(y * 2 - 1)}${currentLetter}`;
            lines.push(padding + middle + padding);
        }
        return [...lines, ...lines.slice(0, -1).reverse()].join('\n') + '\n';
    }
}
exports.default = Diamond;
