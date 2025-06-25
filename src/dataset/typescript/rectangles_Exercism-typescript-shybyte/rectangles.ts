type Diagram = string[]

function isHorizontalEdge(diagram: Diagram, y: number, x1: number, x2: number) {
    return /^[+-]+$/.test(diagram[y].slice(x1, x2))
}

function isVerticalEdge(diagram: Diagram, x: number, y1: number, y2: number) {
    return diagram.slice(y1, y2).every((row) => row[x] === '+' || row[x] === '|')
}

function testRectangle(diagram: Diagram, x1: number, y1: number, x2: number, y2: number) {
    const corners = diagram[y1][x1] === '+' &&
        diagram[y1][x2] === '+' &&
        diagram[y2][x1] === '+' &&
        diagram[y2][x2] === '+'

    const topEdge = isHorizontalEdge(diagram, y1, x1, x2)
    const bottomEdge = isHorizontalEdge(diagram, y2, x1, x2)
    const leftEdge = isVerticalEdge(diagram, x1, y1, y2)
    const rightEdge = isVerticalEdge(diagram, x2, y1, y2)

    return corners && topEdge && bottomEdge && leftEdge && rightEdge
}

function count(diagram: Diagram) {
    const height = diagram.length
    if (height === 0) {
        return 0
    }

    const width = diagram[0].length
    if (width < 2) {
        return 0
    }

    let counter = 0
    for (let x1 = 0; x1 < width; x1++) {
        for (let y1 = 0; y1 < height; y1++) {
            for (let x2 = x1 + 1; x2 < width; x2++) {
                for (let y2 = y1 + 1; y2 < height; y2++) {
                    if (testRectangle(diagram, x1, y1, x2, y2)) {
                        counter += 1
                    }
                }
            }
        }
    }
    return counter
}

export default {count}
