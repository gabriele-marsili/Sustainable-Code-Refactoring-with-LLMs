const codeA = 'A'.charCodeAt(0);

export default class Diamond {
    makeDiamond(maxChar: string) {
        const maxCharCode = maxChar.charCodeAt(0);
        const charIndex = maxCharCode - codeA;
        const size = charIndex * 2 + 1;
        const middle = charIndex;
        let squareString = '';

        for (let y = 0; y < size; y++) {
            const distanceToCenterY = Math.abs(y - middle);
            const currentLetter = String.fromCharCode(maxCharCode - distanceToCenterY);
            let row = '';

            for (let x = 0; x < size; x++) {
                const distanceToCenterX = Math.abs(x - middle);

                if (distanceToCenterX === distanceToCenterY && distanceToCenterX <= charIndex) {
                    row += currentLetter;
                } else {
                    row += ' ';
                }
            }
            squareString += row + '\n';
        }

        return squareString;
    }
}