"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const diamond_1 = require("./diamond");
function diamondify(parts) {
    // prettier-ignore
    return (parts[0]
        .trim() // Remove leading and trailing whitespace
        .split('\n') // Consider each row
        .map((line) => {
        return line
            .trim() // Remove whitespace at start (and end)
            .replace(/·/g, ' '); // Use spaces instead of ·
    })
        .filter(Boolean) // Remove empty rows (if any)
        .join('\n') + // Turn back into a single string
        '\n' // Should have a final newline
    );
}
describe('Make diamond function', () => {
    it('test letter A', () => {
        const result = 'A\n';
        expect((0, diamond_1.makeDiamond)('A')).toEqual(result);
    });
    it('test letter C', () => {
        const result = diamondify `
      ··A··
      ·B·B·
      C···C
      ·B·B·
      ··A··
    `;
        expect((0, diamond_1.makeDiamond)('C')).toEqual(result);
    });
    it('test letter E', () => {
        const result = diamondify `
      ····A····
      ···B·B···
      ··C···C··
      ·D·····D·
      E·······E
      ·D·····D·
      ··C···C··
      ···B·B···
      ····A····
    `;
        expect((0, diamond_1.makeDiamond)('E')).toEqual(result);
    });
});
