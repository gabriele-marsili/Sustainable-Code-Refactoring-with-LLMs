"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const codeA = 'A'.charCodeAt(0);
class Diamond {
    makeDiamond(maxChar) {
        const maxCharCode = maxChar.charCodeAt(0);
        const charIndex = maxCharCode - codeA;
        const size = charIndex * 2 + 1;
        const middle = charIndex;
        let diamondString = '';
        for (let i = 0; i < size; i++) {
            let row = '';
            const distanceToCenter = Math.abs(i - middle);
            const currentCharCode = maxCharCode - distanceToCenter;
            const currentChar = String.fromCharCode(currentCharCode);
            for (let j = 0; j < size; j++) {
                if (Math.abs(j - middle) === distanceToCenter) {
                    row += currentChar;
                }
                else {
                    row += ' ';
                }
            }
            diamondString += row + '\n';
        }
        return diamondString;
    }
}
exports.default = Diamond;
