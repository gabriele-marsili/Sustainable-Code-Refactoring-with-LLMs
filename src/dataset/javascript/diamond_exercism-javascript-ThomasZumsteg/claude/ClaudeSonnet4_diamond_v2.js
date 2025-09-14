class Diamond {
    makeDiamond(letter) {
        const n = letter.charCodeAt(0) - 65; // 'A'.charCodeAt(0) = 65
        const width = 2 * n + 1;
        const lines = [];
        
        // Generate upper half including middle
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
        
        // Add lower half (reverse of upper half excluding middle)
        for (let i = n - 1; i >= 0; i--) {
            lines.push(lines[i]);
        }
        
        return lines.join('\n') + '\n';
    }
}

export default Diamond;