type Pos = [number, number];

function getNeighbors([row, col]: Pos): Pos[] {
    return [
        [row, col - 1],
        [row, col + 1],
        [row - 1, col],
        [row + 1, col],
        [row + 1, col - 1],
        [row - 1, col + 1],
    ];
}

export default class Board {
    private readonly content: string[][];

    constructor(boardInput: string[]) {
        this.content = boardInput.map((row) => row.replace(/ /g, '').split(''));
    }

    winner() {
        return this.canConnectX() ? 'X' : this.canConnectO() ? 'O' : '';
    }

    canConnectX() {
        const cols = this.content[0].length;
        const isRightBorder = (_: Pos, col: number) => col === cols - 1;
        return this.canConnect(
            'X',
            this.content.map((_row, rowIndex) => [rowIndex, 0] as Pos),
            isRightBorder
        );
    }

    canConnectO() {
        const rows = this.content.length;
        const isBottomBorder = (row: number) => row === rows - 1;
        return this.canConnect(
            'O',
            this.content[0].map((_cell, colIndex) => [0, colIndex] as Pos),
            isBottomBorder
        );
    }

    canConnect(player: string, startBorderFields: Pos[], isFinalBorder: (row: number, col: number) => boolean) {
        const visited = new Set<string>();
        const fieldStack = [...startBorderFields];

        while (fieldStack.length > 0) {
            const [row, col] = fieldStack.pop()!;
            if (visited.has(`${row},${col}`)) continue;
            visited.add(`${row},${col}`);

            if (isFinalBorder(row, col)) return true;

            for (const [nRow, nCol] of getNeighbors([row, col])) {
                if (
                    this.content[nRow]?.[nCol] === player &&
                    !visited.has(`${nRow},${nCol}`)
                ) {
                    fieldStack.push([nRow, nCol]);
                }
            }
        }

        return false;
    }
}