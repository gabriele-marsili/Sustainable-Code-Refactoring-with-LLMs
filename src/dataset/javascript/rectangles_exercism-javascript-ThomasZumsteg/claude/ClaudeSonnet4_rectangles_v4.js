function is_rectangle(diagram, top_left, bottom_right) {
    const { row: tr, col: tc } = top_left;
    const { row: br, col: bc } = bottom_right;
    
    if (diagram[tr][tc] !== '+' ||
        diagram[br][bc] !== '+' ||
        diagram[br][tc] !== '+' ||
        diagram[tr][bc] !== '+')
        return false;
    
    for (let row = tr + 1; row < br; row++) {
        if ((diagram[row][tc] !== '|' && diagram[row][tc] !== '+') ||
            (diagram[row][bc] !== '|' && diagram[row][bc] !== '+'))
            return false;
    }
    
    for (let col = tc + 1; col < bc; col++) {
        if ((diagram[tr][col] !== '-' && diagram[tr][col] !== '+') ||
            (diagram[br][col] !== '-' && diagram[br][col] !== '+'))
            return false;
    }
    
    return true;
}

export default function(diagram) {
    let count = 0;
    const rows = diagram.length;
    
    for (let r = 0; r < rows - 1; r++) {
        const cols = diagram[r].length;
        for (let c = 0; c < cols - 1; c++) {
            if (diagram[r][c] === '+') {
                for (let i = r + 1; i < rows; i++) {
                    for (let j = c + 1; j < cols; j++) {
                        if (diagram[i][j] === '+' && 
                            is_rectangle(diagram, {row: r, col: c}, {row: i, col: j})) {
                            count++;
                        }
                    }
                }
            }
        }
    }
    return count;
}