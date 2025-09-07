function is_rectangle(diagram, top_left, bottom_right) {
    if (
        diagram[top_left.row][top_left.col] !== '+' ||
        diagram[bottom_right.row][bottom_right.col] !== '+' ||
        diagram[bottom_right.row][top_left.col] !== '+' ||
        diagram[top_left.row][bottom_right.col] !== '+'
    ) return false;

    for (let row = top_left.row + 1; row < bottom_right.row; row++) {
        if (diagram[row][top_left.col] !== '|' && diagram[row][top_left.col] !== '+') return false;
        if (diagram[row][bottom_right.col] !== '|' && diagram[row][bottom_right.col] !== '+') return false;
    }

    for (let col = top_left.col + 1; col < bottom_right.col; col++) {
        if (diagram[top_left.row][col] !== '-' && diagram[top_left.row][col] !== '+') return false;
        if (diagram[bottom_right.row][col] !== '-' && diagram[bottom_right.row][col] !== '+') return false;
    }

    return true;
}

export default function(diagram) {
    let count = 0;
    const rows = diagram.length;
    const cols = diagram[0].length;

    for (let r1 = 0; r1 < rows; r1++) {
        for (let c1 = 0; c1 < cols; c1++) {
            if (diagram[r1][c1] === '+') {
                for (let r2 = r1 + 1; r2 < rows; r2++) {
                    if (diagram[r2][c1] !== '+') continue;
                    for (let c2 = c1 + 1; c2 < cols; c2++) {
                        if (diagram[r1][c2] === '+' && diagram[r2][c2] === '+') {
                            if (is_rectangle(diagram, { row: r1, col: c1 }, { row: r2, col: c2 })) {
                                count++;
                            }
                        }
                    }
                }
            }
        }
    }

    return count;
}