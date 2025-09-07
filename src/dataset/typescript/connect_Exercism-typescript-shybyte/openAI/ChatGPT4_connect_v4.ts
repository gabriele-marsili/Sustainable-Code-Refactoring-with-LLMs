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
        this.content = boardInput.map((row) => [...row.replace(/ /g, '')]);
    }

    winner(): string {
        return this.canConnectX() ? 'X' : this.canConnectO() ? 'O' : '';
    }

    canConnectX(): boolean {
        const cols = this.content[0].length;
        const isRightBorder = (_: Pos, col: number) => col === cols;
        return this.canConnect(
            'X',
            this.content.map((_row, rowIndex) => [rowIndex, -1] as Pos),
            isRightBorder
        );
    }

    canConnectO(): boolean {
        const rows = this.content.length;
        const isBottomBorder = (row: number) => row === rows;
        return this.canConnect(
            'O',
            this.content[0].map((_cell, colIndex) => [-1, colIndex] as Pos),
            (_, __, row) => isBottomBorder(row)
        );
    }

    private canConnect(
        player: string,
        startBorderFields: Pos[],
        isFinalBorder: (row: number, col: number, neighborRow?: number) => boolean
    ): boolean {
        const visited = new Set<string>();
        const fieldStack = [...startBorderFields];

        while (fieldStack.length > 0) {
            const [row, col] = fieldStack.pop()!;
            const key = `${row},${col}`;
            if (visited.has(key)) continue;
            visited.add(key);

            for (const [nRow, nCol] of getNeighbors([row, col])) {
                if (isFinalBorder(row, col, nRow)) return true;
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