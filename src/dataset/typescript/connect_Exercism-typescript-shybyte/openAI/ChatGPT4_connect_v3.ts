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
        const isRightBorder = ([_row, col]: Pos) => col === cols;
        return this.canConnect(
            'X',
            this.content.map((_row, rowIndex) => [rowIndex, -1] as Pos),
            isRightBorder
        );
    }

    canConnectO(): boolean {
        const rows = this.content.length;
        const isBottomBorder = ([row, _col]: Pos) => row === rows;
        return this.canConnect(
            'O',
            this.content[0].map((_cell, colIndex) => [-1, colIndex] as Pos),
            isBottomBorder
        );
    }

    canConnect(player: string, startBorderFields: Pos[], isFinalBorder: (p: Pos) => boolean): boolean {
        const visited = new Set<string>();
        const fieldStack = [...startBorderFields];

        while (fieldStack.length > 0) {
            const field = fieldStack.pop()!;
            const fieldKey = `${field[0]},${field[1]}`;

            if (visited.has(fieldKey)) continue;
            visited.add(fieldKey);

            for (const neighbor of getNeighbors(field)) {
                if (isFinalBorder(neighbor)) {
                    return true;
                }

                const [row, col] = neighbor;
                if (this.content[row]?.[col] === player) {
                    fieldStack.push(neighbor);
                }
            }
        }

        return false;
    }
}