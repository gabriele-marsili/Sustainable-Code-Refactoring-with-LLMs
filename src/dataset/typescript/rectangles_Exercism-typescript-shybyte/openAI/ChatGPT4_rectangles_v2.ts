type Diagram = string[]

function isHorizontalEdge(diagram: Diagram, y: number, x1: number, x2: number): boolean {
    const row = diagram[y]
    for (let x = x1; x <= x2; x++) {
        if (row[x] !== '+' && row[x] !== '-') return false
    }
    return true
}

function isVerticalEdge(diagram: Diagram, x: number, y1: number, y2: number): boolean {
    for (let y = y1; y <= y2; y++) {
        const char = diagram[y][x]
        if (char !== '+' && char !== '|') return false
    }
    return true
}

function testRectangle(diagram: Diagram, x1: number, y1: number, x2: number, y2: number): boolean {
    return (
        diagram[y1][x1] === '+' &&
        diagram[y1][x2] === '+' &&
        diagram[y2][x1] === '+' &&
        diagram[y2][x2] === '+' &&
        isHorizontalEdge(diagram, y1, x1, x2) &&
        isHorizontalEdge(diagram, y2, x1, x2) &&
        isVerticalEdge(diagram, x1, y1, y2) &&
        isVerticalEdge(diagram, x2, y1, y2)
    )
}

function count(diagram: Diagram): number {
    const height = diagram.length
    if (height === 0) return 0

    const width = diagram[0].length
    if (width < 2) return 0

    let counter = 0
    for (let y1 = 0; y1 < height - 1; y1++) {
        for (let x1 = 0; x1 < width - 1; x1++) {
            if (diagram[y1][x1] !== '+') continue
            for (let y2 = y1 + 1; y2 < height; y2++) {
                if (diagram[y2][x1] !== '+') continue
                for (let x2 = x1 + 1; x2 < width; x2++) {
                    if (diagram[y1][x2] === '+' && diagram[y2][x2] === '+' && testRectangle(diagram, x1, y1, x2, y2)) {
                        counter++
                    }
                }
            }
        }
    }
    return counter
}

export default { count }