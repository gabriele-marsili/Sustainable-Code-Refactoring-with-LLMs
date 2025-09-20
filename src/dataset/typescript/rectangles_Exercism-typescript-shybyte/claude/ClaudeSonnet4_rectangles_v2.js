"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isHorizontalEdge(diagram, y, x1, x2) {
    for (let x = x1; x <= x2; x++) {
        const char = diagram[y][x];
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
    // Early exit if corners are not '+'
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
    if (height === 0) {
        return 0;
    }
    const width = diagram[0].length;
    if (width < 2) {
        return 0;
    }
    let counter = 0;
    for (let x1 = 0; x1 < width - 1; x1++) {
        for (let y1 = 0; y1 < height - 1; y1++) {
            // Skip if top-left corner is not '+'
            if (diagram[y1][x1] !== '+')
                continue;
            for (let x2 = x1 + 1; x2 < width; x2++) {
                // Skip if top-right corner is not '+'
                if (diagram[y1][x2] !== '+')
                    continue;
                for (let y2 = y1 + 1; y2 < height; y2++) {
                    if (testRectangle(diagram, x1, y1, x2, y2)) {
                        counter += 1;
                    }
                }
            }
        }
    }
    return counter;
}
exports.default = { count };
