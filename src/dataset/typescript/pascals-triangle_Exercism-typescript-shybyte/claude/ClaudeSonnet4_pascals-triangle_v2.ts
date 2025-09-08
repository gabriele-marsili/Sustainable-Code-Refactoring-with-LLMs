export default class Triangle {
    readonly rows: number[][]

    constructor(size: number) {
        if (size <= 0) {
            this.rows = []
            return
        }
        
        const rows: number[][] = new Array(size)
        rows[0] = [1]
        
        for (let l = 1; l < size; l++) {
            const prevRow = rows[l - 1]
            const currentRow = new Array(l + 1)
            currentRow[0] = 1
            currentRow[l] = 1
            
            for (let i = 1; i < l; i++) {
                currentRow[i] = prevRow[i - 1] + prevRow[i]
            }
            
            rows[l] = currentRow
        }
        
        this.rows = rows
    }

    get lastRow() {
        return this.rows[this.rows.length - 1]
    }
}