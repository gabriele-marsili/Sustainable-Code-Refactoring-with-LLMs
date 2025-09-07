type Diagram = string[]

function isHorizontalEdge(diagram: Diagram, y: number, x1: number, x2: number) {
    const row = diagram[y]
    for (let x = x1; x <= x2; x++) {
        const char = row[x]
        if (char !== '+' && char !== '-') {
            return false
        }
    }
    return true
}

function isVerticalEdge(diagram: Diagram, x: number, y1: number, y2: number) {
    for (let y = y1; y <= y2; y++) {
        const char = diagram[y][x]
        if (char !== '+' && char !== '|') {
            return false
        }
    }
    return true
}

function testRectangle(diagram: Diagram, x1: number, y1: number, x2: number, y2: number) {
    // Early exit if corners are not '+'
    if (diagram[y1][x1] !== '+' || diagram[y1][x2] !== '+' || 
        diagram[y2][x1] !== '+' || diagram[y2][x2] !== '+') {
        return false
    }

    // Check edges in order of likely failure
    return isHorizontalEdge(diagram, y1, x1, x2) &&
           isHorizontalEdge(diagram, y2, x1, x2) &&
           isVerticalEdge(diagram, x1, y1, y2) &&
           isVerticalEdge(diagram, x2, y1, y2)
}

function count(diagram: Diagram) {
    const height = diagram.length
    if (height === 0) {
        return 0
    }

    const width = diagram[0].length
    if (width < 2 || height < 2) {
        return 0
    }

    let counter = 0
    
    // Pre-compute potential corner positions
    const cornerPositions: Array<[number, number]> = []
    for (let y = 0; y < height; y++) {
        const row = diagram[y]
        for (let x = 0; x < width; x++) {
            if (row[x] === '+') {
                cornerPositions.push([x, y])
            }
        }
    }

    // Only test rectangles between actual corner positions
    for (let i = 0; i < cornerPositions.length; i++) {
        const [x1, y1] = cornerPositions[i]
        for (let j = i + 1; j < cornerPositions.length; j++) {
            const [x2, y2] = cornerPositions[j]
            
            // Ensure we have a valid rectangle orientation
            if (x2 > x1 && y2 > y1) {
                if (testRectangle(diagram, x1, y1, x2, y2)) {
                    counter++
                }
            }
        }
    }
    
    return counter
}

export default {count}