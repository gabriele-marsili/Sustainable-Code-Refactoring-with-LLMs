function is_rectangle(diagram, top_left, bottom_right) {
    const { row: tl_row, col: tl_col } = top_left;
    const { row: br_row, col: br_col } = bottom_right;

    if (diagram[tl_row][tl_col] !== '+' ||
        diagram[br_row][br_col] !== '+' ||
        diagram[br_row][tl_col] !== '+' ||
        diagram[tl_row][br_col] !== '+') {
        return false;
    }

    for (let row = tl_row + 1; row < br_row; row++) {
        if (diagram[row][tl_col] !== '|' || diagram[row][br_col] !== '|') {
            return false;
        }
    }

    for (let col = tl_col + 1; col < br_col; col++) {
        if (diagram[tl_row][col] !== '-' || diagram[br_row][col] !== '-') {
            return false;
        }
    }

    return true;
}

export default function(diagram) {
    let count = 0;
    const rows = diagram.length;

    for (let r = 0; r < rows; r++) {
        const cols = diagram[r].length;
        for (let c = 0; c < cols; c++) {
            if (diagram[r][c] === '+') {
                for (let i = r + 1; i < rows; i++) {
                    for (let j = c + 1; j < cols; j++) {
                        if (diagram[i][j] === '+' &&
                            diagram[r][j] === '+' &&
                            diagram[i][c] === '+' &&
                            is_rectangle(diagram, { row: r, col: c }, { row: i, col: j })) {
                            count++;
                        }
                    }
                }
            }
        }
    }
    return count;
}