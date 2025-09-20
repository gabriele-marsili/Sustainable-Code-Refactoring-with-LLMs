"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getNeighbors([row, col]) {
    return [
        [row, col - 1],
        [row, col + 1],
        [row - 1, col],
        [row + 1, col],
        [row + 1, col - 1],
        [row - 1, col + 1],
    ];
}
class Board {
    constructor(boardInput) {
        this.content = boardInput.map((row) => [...row.replace(/ /g, '')]);
    }
    winner() {
        return this.canConnectX() ? 'X' : this.canConnectO() ? 'O' : '';
    }
    canConnectX() {
        const cols = this.content[0].length;
        const isRightBorder = ([_row, col]) => col === cols;
        return this.canConnect('X', this.content.map((_row, rowIndex) => [rowIndex, -1]), isRightBorder);
    }
    canConnectO() {
        const rows = this.content.length;
        const isBottomBorder = ([row, _col]) => row === rows;
        return this.canConnect('O', this.content[0].map((_cell, colIndex) => [-1, colIndex]), isBottomBorder);
    }
    canConnect(player, startBorderFields, isFinalBorder) {
        var _a;
        const visited = new Set();
        const fieldStack = [...startBorderFields];
        while (fieldStack.length > 0) {
            const field = fieldStack.pop();
            const fieldKey = `${field[0]},${field[1]}`;
            if (visited.has(fieldKey))
                continue;
            visited.add(fieldKey);
            for (const neighbor of getNeighbors(field)) {
                if (isFinalBorder(neighbor)) {
                    return true;
                }
                const [row, col] = neighbor;
                if (((_a = this.content[row]) === null || _a === void 0 ? void 0 : _a[col]) === player) {
                    fieldStack.push(neighbor);
                }
            }
        }
        return false;
    }
}
exports.default = Board;
