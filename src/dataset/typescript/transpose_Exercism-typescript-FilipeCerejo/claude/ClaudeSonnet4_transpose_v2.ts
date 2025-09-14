export function transpose(initialMtx: string[]): string[] {
    if (initialMtx.length === 0) return [];
    
    const maxLength = Math.max(...initialMtx.map(row => row.length));
    const transposeMtx: string[] = new Array(maxLength);
    
    for (let col = 0; col < maxLength; col++) {
        let column = '';
        let lastCharIndex = -1;
        
        // Find the last row that has a character at this column
        for (let row = initialMtx.length - 1; row >= 0; row--) {
            if (initialMtx[row][col]) {
                lastCharIndex = row;
                break;
            }
        }
        
        // Build column up to the last character position
        for (let row = 0; row <= lastCharIndex; row++) {
            column += initialMtx[row][col] || ' ';
        }
        
        transposeMtx[col] = column;
    }
    
    return transposeMtx;
}