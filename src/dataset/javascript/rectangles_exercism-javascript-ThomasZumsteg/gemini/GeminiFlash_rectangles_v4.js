function is_rectangle(diagram, top_left, bottom_right) {
    const { row: topRow, col: leftCol } = top_left;
    const { row: bottomRow, col: rightCol } = bottom_right;

    if (diagram[topRow][leftCol] !== '+' ||
        diagram[bottomRow][rightCol] !== '+' ||
        diagram[bottomRow][leftCol] !== '+' ||
        diagram[topRow][rightCol] !== '+') {
        return false;
    }

    for (let row = topRow + 1; row < bottomRow; row++) {
        if (diagram[row][leftCol] !== '|' && diagram[row][leftCol] !== '+') return false;
        if (diagram[row][rightCol] !== '|' && diagram[row][rightCol] !== '+') return false;
    }

    for (let col = leftCol + 1; col < rightCol; col++) {
        if (diagram[topRow][col] !== '-' && diagram[topRow][col] !== '+') return false;
        if (diagram[bottomRow][col] !== '-' && diagram[bottomRow][col] !== '+') return false;
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
                            diagram[r][j] === '+' &&
                            diagram[i][c] === '+') {
                            let valid = true;

                            for (let k = r + 1; k < i; k++) {
                                if ((diagram[k][c] !== '|') && (diagram[k][c] !== '+')) {
                                    valid = false;
                                    break;
                                }
                                if ((diagram[k][j] !== '|') && (diagram[k][j] !== '+')) {
                                    valid = false;
                                    break;
                                }
                            }
                            if (!valid) continue;

                            for (let k = c + 1; k < j; k++) {
                                if ((diagram[r][k] !== '-') && (diagram[r][k] !== '+')) {
                                    valid = false;
                                    break;
                                }
                                if ((diagram[i][k] !== '-') && (diagram[i][k] !== '+')) {
                                    valid = false;
                                    break;
                                }
                            }
                            if (valid) {
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