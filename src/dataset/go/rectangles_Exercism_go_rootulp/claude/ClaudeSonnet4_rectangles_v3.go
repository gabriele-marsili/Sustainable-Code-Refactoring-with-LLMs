package rectangles

const CORNER rune = '+'
const VERTICAL_EDGE rune = '|'
const HORIZONTAL_EDGE rune = '-'

func Count(diagram []string) (rectangles int) {
	if len(diagram) == 0 {
		return 0
	}
	
	for rowIndex, row := range diagram {
		for columnIndex, token := range row {
			if isCorner(token) {
				rectangles += countRectanglesForTopLeft(diagram, columnIndex, rowIndex)
			}
		}
	}
	return rectangles
}

func findValidColumns(diagram []string, columnIndex int, rowIndex int) (validColumns []int) {
	row := diagram[rowIndex]
	validColumns = make([]int, 0, len(row)-columnIndex-1)

	for i := columnIndex + 1; i < len(row); i++ {
		char := rune(row[i])
		if isCorner(char) {
			validColumns = append(validColumns, i)
		} else if !isHorizontalEdge(char) {
			break
		}
	}
	return validColumns
}

func findValidRows(diagram []string, columnIndex int, rowIndex int) (validRows []int) {
	validRows = make([]int, 0, len(diagram)-rowIndex-1)

	for j := rowIndex + 1; j < len(diagram); j++ {
		char := rune(diagram[j][columnIndex])
		if isCorner(char) {
			validRows = append(validRows, j)
		} else if !isVerticalEdge(char) {
			break
		}
	}
	return validRows
}

func countRectanglesForTopLeft(diagram []string, columnIndex int, rowIndex int) (rectangles int) {
	validColumns := findValidColumns(diagram, columnIndex, rowIndex)
	if len(validColumns) == 0 {
		return 0
	}
	
	validRows := findValidRows(diagram, columnIndex, rowIndex)
	if len(validRows) == 0 {
		return 0
	}

	for _, column := range validColumns {
		if !isValidHorizontalEdgeInline(diagram[rowIndex], columnIndex, column) {
			continue
		}
		
		for _, row := range validRows {
			if isCorner(rune(diagram[row][column])) &&
				isValidHorizontalEdgeInline(diagram[row], columnIndex, column) &&
				isValidVerticalEdgeInline(diagram, column, rowIndex, row) {
				rectangles++
			}
		}
	}
	return rectangles
}

func isValidHorizontalEdge(row string) bool {
	for _, v := range row {
		if !isCorner(v) && !isHorizontalEdge(v) {
			return false
		}
	}
	return true
}

func isValidHorizontalEdgeInline(row string, start, end int) bool {
	for i := start; i <= end; i++ {
		char := rune(row[i])
		if !isCorner(char) && !isHorizontalEdge(char) {
			return false
		}
	}
	return true
}

func isValidVerticalEdge(column string) bool {
	for _, v := range column {
		if !isCorner(v) && !isVerticalEdge(v) {
			return false
		}
	}
	return true
}

func isValidVerticalEdgeInline(diagram []string, column, rowStart, rowEnd int) bool {
	for i := rowStart; i <= rowEnd; i++ {
		char := rune(diagram[i][column])
		if !isCorner(char) && !isVerticalEdge(char) {
			return false
		}
	}
	return true
}

func verticalEdge(diagram []string, column int, rowStart int, rowEnd int) (edge string) {
	for i := rowStart; i < rowEnd; i++ {
		edge += string(diagram[i][column])
	}
	return edge
}

func isCorner(r rune) bool {
	return r == CORNER
}

func isHorizontalEdge(r rune) bool {
	return r == HORIZONTAL_EDGE
}

func isVerticalEdge(r rune) bool {
	return r == VERTICAL_EDGE
}