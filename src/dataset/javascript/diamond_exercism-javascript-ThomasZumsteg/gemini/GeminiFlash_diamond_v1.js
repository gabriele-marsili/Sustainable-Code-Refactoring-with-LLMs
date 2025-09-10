class Diamond {
    makeDiamond(letter) {
        const letterCode = letter.charCodeAt(0);
        const startCode = 'A'.charCodeAt(0);
        const lineLen = letterCode - startCode + 1;
        const width = lineLen * 2 - 1;
        let diamond = '';

        for (let i = 0; i < lineLen; i++) {
            const currentChar = String.fromCharCode(startCode + i);
            let row = '';

            for (let j = 0; j < width; j++) {
                if (j === lineLen - 1 - i || j === lineLen - 1 + i) {
                    row += currentChar;
                } else {
                    row += ' ';
                }
            }
            diamond += row + '\n';
        }

        for (let i = lineLen - 2; i >= 0; i--) {
            const currentChar = String.fromCharCode(startCode + i);
            let row = '';
            for (let j = 0; j < width; j++) {
                if (j === lineLen - 1 - i || j === lineLen - 1 + i) {
                    row += currentChar;
                } else {
                    row += ' ';
                }
            }
            diamond += row + '\n';
        }

        return diamond;
    }
}

export default Diamond;