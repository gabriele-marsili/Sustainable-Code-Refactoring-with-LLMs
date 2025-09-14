class Diamond {
    makeDiamond(letter) {
        const n = letter.charCodeAt(0) - 65;
        const width = 2 * n + 1;
        const lines = [];
        
        for (let i = 0; i <= n; i++) {
            const char = String.fromCharCode(65 + i);
            const spaces = n - i;
            
            if (i === 0) {
                lines.push(' '.repeat(spaces) + char + ' '.repeat(spaces));
            } else {
                const innerSpaces = 2 * i - 1;
                lines.push(' '.repeat(spaces) + char + ' '.repeat(innerSpaces) + char + ' '.repeat(spaces));
            }
        }
        
        const result = lines.concat(lines.slice(0, -1).reverse());
        return result.join('\n') + '\n';
    }
}

export default Diamond;