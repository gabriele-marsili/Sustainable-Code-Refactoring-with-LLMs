type Pos = [number, number];

function getNeighbors([row, col]: Pos): Pos[] {
    return [
        [row, col - 1],
        [row, col + 1],
        [row - 1, col],
        [row + 1, col],
        [row + 1, col - 1],
        [row - 1, col + 1]
    ];
}

export default class Board {
    private readonly content: string[][];

    constructor(boardInput: string[]) {
        this.content = boardInput.map((row) => row.replace(/ /g, '').split(''));
    }

    winner() {
        if (this.canConnectX()) {
            return 'X';
        } else if (this.canConnectO()) {
            return 'O';
        } else {
            return '';
        }
    }

    canConnectX() {
        const cols = this.content[0].length;
        const isRightBorder = ([_row, col]: Pos) => col === cols;
        return this.canConnect('X',
            Array.from({ length: this.content.length }, (_, rowIndex) => [rowIndex, -1] as Pos),
            isRightBorder
        );
    }

    canConnectO() {
        const rows = this.content.length;
        const isBottomBorder = ([row, _col]: Pos) => row === rows;
        return this.canConnect('O',
            Array.from({ length: this.content[0].length }, (_, colIndex) => [-1, colIndex] as Pos),
            isBottomBorder
        );
    }

    canConnect(player: string, startBorderFields: Pos[], isFinalBorder: (p: Pos) => boolean) {
        const rows = this.content.length;
        const cols = this.content[0].length;
        const visited: boolean[][] = Array(rows).fill(null).map(() => Array(cols).fill(false));
        const fieldStack: Pos[] = [...startBorderFields];

        while (fieldStack.length > 0) {
            const field = fieldStack.pop()!;
            const neighbors = getNeighbors(field);

            for (const neighbor of neighbors) {
                if (isFinalBorder(neighbor)) {
                    return true;
                }

                const [row, col] = neighbor;
                if (row >= 0 && row < rows && col >= 0 && col < cols && !visited[row][col] && this.content[row][col] === player) {
                    visited[row][col] = true;
                    fieldStack.push(neighbor);
                }
            }
        }

        return false;
    }
}