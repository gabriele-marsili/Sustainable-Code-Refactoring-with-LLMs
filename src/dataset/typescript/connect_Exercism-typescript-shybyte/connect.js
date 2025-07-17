"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function clone(object) {
    return JSON.parse(JSON.stringify(object));
}
function getNeighbors([row, col]) {
    return [
        [row, col - 1],
        [row, col + 1],
        [row - 1, col],
        [row + 1, col],
        [row + 1, col - 1],
        [row - 1, col + 1]
    ];
}
class Board {
    constructor(boardInput) {
        this.content = boardInput.map((row) => [...row.replace(/ /g, '')]);
    }
    winner() {
        if (this.canConnectX()) {
            return 'X';
        }
        else if (this.canConnectO()) {
            return 'O';
        }
        else {
            return '';
        }
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
        const boardContent = clone(this.content);
        const fieldStack = clone((startBorderFields));
        while (fieldStack.length > 0) {
            const field = fieldStack.pop();
            const neighbors = getNeighbors(field);
            for (const neighbor of neighbors) {
                if (isFinalBorder(neighbor)) {
                    return true;
                }
                const [row, col] = neighbor;
                if (boardContent[row] && boardContent[row][col] === player) {
                    boardContent[row][col] = '!'; // mark field as visited
                    fieldStack.push(neighbor);
                }
            }
        }
        return false;
    }
}
exports.default = Board;
