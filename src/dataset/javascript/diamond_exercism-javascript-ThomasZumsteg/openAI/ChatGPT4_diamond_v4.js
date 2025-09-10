class Diamond {
    makeDiamond(letter) {
        const lineLen = letter.charCodeAt(0) - 'A'.charCodeAt(0) + 1;
        const lines = [];
        for (let i = 0; i < lineLen; i++) {
            const char = String.fromCharCode('A'.charCodeAt(0) + i);
            const padding = ' '.repeat(lineLen - i - 1);
            const middle = i > 0 ? ' '.repeat(2 * i - 1) : '';
            lines.push(padding + char + middle + (i > 0 ? char : '') + padding);
        }
        return lines.concat(lines.slice(0, -1).reverse()).join('\n') + '\n';
    }
}

export default Diamond;