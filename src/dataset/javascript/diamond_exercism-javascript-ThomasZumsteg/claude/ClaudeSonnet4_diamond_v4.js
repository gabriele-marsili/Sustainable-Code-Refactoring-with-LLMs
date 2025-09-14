class Diamond {
    makeDiamond(letter) {
        const n = letter.charCodeAt(0) - 65;
        const lines = [];
        
        for (let i = 0; i <= n; i++) {
            const char = String.fromCharCode(65 + i);
            const outerSpaces = ' '.repeat(n - i);
            const innerSpaces = i === 0 ? '' : ' '.repeat(2 * i - 1);
            
            lines.push(outerSpaces + char + innerSpaces + (i === 0 ? '' : char) + outerSpaces);
        }
        
        for (let i = n - 1; i >= 0; i--) {
            lines.push(lines[i]);
        }
        
        return lines.join('\n') + '\n';
    }
}

export default Diamond;