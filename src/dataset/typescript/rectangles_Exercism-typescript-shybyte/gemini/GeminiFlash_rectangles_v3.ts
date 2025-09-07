type Diagram = string[]

function isHorizontalEdge(diagram: Diagram, y: number, x1: number, x2: number) {
    const row = diagram[y];
    for (let i = x1; i < x2; i++) {
        const char = row[i];
        if (char !== '+' && char !== '-') {
            return false;
        }
    }
    return true;
}

function isVerticalEdge(diagram: Diagram, x: number, y1: number, y2: number) {
    for (let i = y1; i < y2; i++) {
        const row = diagram[i];
        const char = row[x];
        if (char !== '+' && char !== '|') {
            return false;
        }
    }
    return true;
}

function testRectangle(diagram: Diagram, x1: number, y1: number, x2: number, y2: number) {
    const rowY1 = diagram[y1];
    const rowY2 = diagram[y2];

    if (rowY1[x1] !== '+' || rowY1[x2] !== '+' || rowY2[x1] !== '+' || rowY2[x2] !== '+') {
        return false;
    }

    if (!isHorizontalEdge(diagram, y1, x1, x2)) {
        return false;
    }

    if (!isHorizontalEdge(diagram, y2, x1, x2)) {
        return false;
    }

    if (!isVerticalEdge(diagram, x1, y1, y2)) {
        return false;
    }

    if (!isVerticalEdge(diagram, x2, y1, y2)) {
        return false;
    }

    return true;
}

function count(diagram: Diagram) {
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
            for (let x2 = x1 + 1; x2 < width; x2++) {
                for (let y2 = y1 + 1; y2 < height; y2++) {
                    if (testRectangle(diagram, x1, y1, x2, y2)) {
                        counter++;
                    }
                }
            }
        }
    }
    return counter;
}

export default { count };