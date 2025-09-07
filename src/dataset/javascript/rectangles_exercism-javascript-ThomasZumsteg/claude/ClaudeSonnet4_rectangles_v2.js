function is_rectangle(diagram, top_left, bottom_right) {
    const tl_row = top_left.row, tl_col = top_left.col;
    const br_row = bottom_right.row, br_col = bottom_right.col;
    
    // Check corners
    if(diagram[tl_row][tl_col] !== '+' ||
        diagram[br_row][br_col] !== '+' ||
        diagram[br_row][tl_col] !== '+' ||
        diagram[tl_row][br_col] !== '+')
        return false;
    
    // Check vertical edges
    for(let row = tl_row + 1; row < br_row; row++) {
        const left_char = diagram[row][tl_col];
        const right_char = diagram[row][br_col];
        if(left_char !== '|' && left_char !== '+' ||
           right_char !== '|' && right_char !== '+')
            return false;
    }
    
    // Check horizontal edges
    for(let col = tl_col + 1; col < br_col; col++) {
        const top_char = diagram[tl_row][col];
        const bottom_char = diagram[br_row][col];
        if(top_char !== '-' && top_char !== '+' ||
           bottom_char !== '-' && bottom_char !== '+')
            return false;
    }
    
    return true;
}

export default function(diagram) {
    let count = 0;
    const rows = diagram.length;
    
    for(let r = 0; r < rows; r++) {
        const row_length = diagram[r].length;
        for(let c = 0; c < row_length; c++) {
            if(diagram[r][c] === '+') {
                for(let i = r + 1; i < rows; i++) {
                    for(let j = c + 1; j < row_length; j++) {
                        if(diagram[i][j] === '+' && 
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