"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const codeA = 'A'.charCodeAt(0);
class Diamond {
    makeDiamond(maxChar) {
        const maxCharCode = maxChar.charCodeAt(0);
        const charIndex = maxCharCode - codeA;
        const size = charIndex * 2 + 1;
        const result = [];
        for (let y = 0; y < size; y++) {
            const distanceToCenterY = Math.abs(y - charIndex);
            const currentLetter = String.fromCharCode(maxCharCode - distanceToCenterY);
            const row = new Array(size);
            for (let x = 0; x < size; x++) {
                const distanceToCenter = Math.abs(x - charIndex) + distanceToCenterY;
                row[x] = distanceToCenter === charIndex ? currentLetter : ' ';
            }
            result.push(row.join(''));
        }
        return result.join('\n') + '\n';
    }
}
exports.default = Diamond;
