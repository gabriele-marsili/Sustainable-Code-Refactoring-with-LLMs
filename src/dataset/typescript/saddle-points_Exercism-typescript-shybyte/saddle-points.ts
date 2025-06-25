type Matrix = number[][]

interface MatrixPosition {
    row: number
    column: number
}

export default class SaddlePoints {
    static saddlePoints(rows: Matrix): MatrixPosition[] {
        const cols = rows[0].map((_, colIndex) =>
            rows.map((row) => row[colIndex]))

        const result: MatrixPosition[] = []
        const minOfCols = cols.map((col) => Math.min(...col))
        rows.forEach((row, rowIndex) => {
            const maxOfRow = Math.max(...row)
            row.forEach((el, colIndex) => {
                if (el >= maxOfRow && el <= minOfCols[colIndex]) {
                    result.push({
                        row: rowIndex,
                        column: colIndex
                    })
                }
            })
        })

        return result
    }
}
