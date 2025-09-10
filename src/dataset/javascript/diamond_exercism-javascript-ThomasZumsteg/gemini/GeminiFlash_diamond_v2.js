class Diamond {
    makeDiamond(letter) {
        const letterCode = letter.charCodeAt(0);
        const startCode = 'A'.charCodeAt(0);
        const lineLen = letterCode - startCode + 1;
        const width = 2 * lineLen - 1;
        let diamond = '';

        for (let i = 0; i < lineLen; i++) {
            const currentChar = String.fromCharCode(startCode + i);
            let line = '';
            for (let j = 0; j < width; j++) {
                if (j === lineLen - 1 - i || j === lineLen - 1 + i) {
                    line += currentChar;
                } else {
                    line += ' ';
                }
            }
            diamond += line + '\n';
        }

        for (let i = lineLen - 2; i >= 0; i--) {
            const currentChar = String.fromCharCode(startCode + i);
            let line = '';
            for (let j = 0; j < width; j++) {
                if (j === lineLen - 1 - i || j === lineLen - 1 + i) {
                    line += currentChar;
                } else {
                    line += ' ';
                }
            }
            diamond += line + '\n';
        }

        return diamond;
    }
}

export default Diamond;