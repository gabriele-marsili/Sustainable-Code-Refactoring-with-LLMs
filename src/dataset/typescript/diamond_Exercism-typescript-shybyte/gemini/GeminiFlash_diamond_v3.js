"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Diamond {
    makeDiamond(maxChar) {
        const maxCharCode = maxChar.charCodeAt(0);
        const charIndex = maxCharCode - 'A'.charCodeAt(0);
        const size = charIndex * 2 + 1;
        const diamondRows = [];
        for (let y = 0; y < size; y++) {
            const distanceToCenterY = Math.abs(y - charIndex);
            const currentLetter = String.fromCharCode(maxCharCode - distanceToCenterY);
            let row = '';
            for (let x = 0; x < size; x++) {
                const distanceToCenterX = Math.abs(x - charIndex);
                row += (distanceToCenterX + distanceToCenterY === charIndex) ? currentLetter : ' ';
            }
            diamondRows.push(row);
        }
        return diamondRows.join('\n') + '\n';
    }
}
exports.default = Diamond;
