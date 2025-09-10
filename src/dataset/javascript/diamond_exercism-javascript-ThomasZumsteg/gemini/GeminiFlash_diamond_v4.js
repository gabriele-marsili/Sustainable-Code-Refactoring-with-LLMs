class Diamond {
    makeDiamond(letter) {
        const letterCode = letter.charCodeAt(0);
        const aCode = 'A'.charCodeAt(0);
        const n = letterCode - aCode;
        const width = 2 * n + 1;
        let diamond = '';

        for (let i = 0; i <= n; i++) {
            let row = '';
            for (let j = 0; j < width; j++) {
                if (j === n - i || j === n + i) {
                    row += String.fromCharCode(aCode + i);
                } else {
                    row += ' ';
                }
            }
            diamond += row + '\n';
        }

        for (let i = n - 1; i >= 0; i--) {
            let row = '';
            for (let j = 0; j < width; j++) {
                if (j === n - i || j === n + i) {
                    row += String.fromCharCode(aCode + i);
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