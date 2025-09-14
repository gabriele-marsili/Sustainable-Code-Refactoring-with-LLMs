class Diamond {
    makeDiamond(letter) {
        const n = letter.charCodeAt(0) - 65; // 'A'.charCodeAt(0) = 65
        if (n === 0) return 'A\n';
        
        const lines = [];
        const width = 2 * n + 1;
        
        // Generate upper half including middle
        for (let i = 0; i <= n; i++) {
            const char = String.fromCharCode(65 + i);
            const padding = ' '.repeat(n - i);
            
            if (i === 0) {
                lines.push(padding + char + padding);
            } else {
                const innerSpacing = ' '.repeat(2 * i - 1);
                lines.push(padding + char + innerSpacing + char + padding);
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