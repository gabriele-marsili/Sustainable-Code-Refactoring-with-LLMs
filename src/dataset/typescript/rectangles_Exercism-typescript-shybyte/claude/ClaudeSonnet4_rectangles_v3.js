"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isHorizontalEdge(diagram, y, x1, x2) {
    const row = diagram[y];
    for (let x = x1; x <= x2; x++) {
        const char = row[x];
        if (char !== '+' && char !== '-') {
            return false;
        }
    }
    return true;
}
function isVerticalEdge(diagram, x, y1, y2) {
    for (let y = y1; y <= y2; y++) {
        const char = diagram[y][x];
        if (char !== '+' && char !== '|') {
            return false;
        }
    }
    return true;
}
function testRectangle(diagram, x1, y1, x2, y2) {
    if (diagram[y1][x1] !== '+' || diagram[y1][x2] !== '+' ||
        diagram[y2][x1] !== '+' || diagram[y2][x2] !== '+') {
        return false;
    }
    return isHorizontalEdge(diagram, y1, x1, x2) &&
        isHorizontalEdge(diagram, y2, x1, x2) &&
        isVerticalEdge(diagram, x1, y1, y2) &&
        isVerticalEdge(diagram, x2, y1, y2);
}
function count(diagram) {
    const height = diagram.length;
    if (height < 2) {
        return 0;
    }
    const width = diagram[0].length;
    if (width < 2) {
        return 0;
    }
    let counter = 0;
    const cornerPositions = [];
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            if (diagram[y][x] === '+') {
                cornerPositions.push([x, y]);
            }
        }
    }
    const positionCount = cornerPositions.length;
    for (let i = 0; i < positionCount; i++) {
        const [x1, y1] = cornerPositions[i];
        for (let j = i + 1; j < positionCount; j++) {
            const [x2, y2] = cornerPositions[j];
            if (x2 > x1 && y2 > y1) {
                if (testRectangle(diagram, x1, y1, x2, y2)) {
                    counter++;
                }
            }
        }
    }
    return counter;
}
exports.default = { count };
