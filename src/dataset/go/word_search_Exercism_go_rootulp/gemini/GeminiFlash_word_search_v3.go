package wordsearch

import (
	"fmt"
)

const (
	NORTH      = "NORTH"
	EAST       = "EAST"
	SOUTH      = "SOUTH"
	WEST       = "WEST"
	NORTH_EAST = "NORTH_EAST"
	NORTH_WEST = "NORTH_WEST"
	SOUTH_EAST = "SOUTH_EAST"
	SOUTH_WEST = "SOUTH_WEST"
)

var DIRECTIONS = []string{NORTH, EAST, SOUTH, WEST, NORTH_EAST, NORTH_WEST, SOUTH_EAST, SOUTH_WEST}
var NOT_FOUND_POINT = [2]int{-1, -1}
var NOT_FOUND_LINE = [2][2]int{NOT_FOUND_POINT, NOT_FOUND_POINT}

func Solve(words []string, puzzle []string) (result map[string][2][2]int, err error) {
	grid := NewGrid(puzzle)
	result = make(map[string][2][2]int, len(words))
	var found bool
	for _, word := range words {
		loc, found := grid.Search(word)
		result[word] = loc
		if !found && err == nil {
			err = fmt.Errorf("word %s not found", word)
		}
	}

	return result, err
}

type Grid struct {
	grid       [][]rune
	rows       int
	cols       int
	directions map[string]func(int, int, int) (rune, bool)
}

func NewGrid(puzzle []string) *Grid {
	rows := len(puzzle)
	grid := make([][]rune, rows)
	for i, row := range puzzle {
		grid[i] = []rune(row)
	}

	cols := 0
	if rows > 0 {
		cols = len(grid[0])
	}

	directions := map[string]func(int, int, int) (rune, bool){
		NORTH: func(row, col, i int) (rune, bool) {
			return safeGet(grid, row-i, col, rows, cols)
		},
		EAST: func(row, col, i int) (rune, bool) {
			return safeGet(grid, row, col+i, rows, cols)
		},
		SOUTH: func(row, col, i int) (rune, bool) {
			return safeGet(grid, row+i, col, rows, cols)
		},
		WEST: func(row, col, i int) (rune, bool) {
			return safeGet(grid, row, col-i, rows, cols)
		},
		NORTH_EAST: func(row, col, i int) (rune, bool) {
			return safeGet(grid, row-i, col+i, rows, cols)
		},
		NORTH_WEST: func(row, col, i int) (rune, bool) {
			return safeGet(grid, row-i, col-i, rows, cols)
		},
		SOUTH_EAST: func(row, col, i int) (rune, bool) {
			return safeGet(grid, row+i, col+i, rows, cols)
		},
		SOUTH_WEST: func(row, col, i int) (rune, bool) {
			return safeGet(grid, row+i, col-i, rows, cols)
		},
	}

	return &Grid{grid: grid, rows: rows, cols: cols, directions: directions}
}

func safeGet(grid [][]rune, row int, col int, rows int, cols int) (rune, bool) {
	if row < 0 || row >= rows {
		return ' ', false
	}
	if col < 0 || col >= cols {
		return ' ', false
	}
	return grid[row][col], true
}

func (g Grid) Search(word string) (result [2][2]int, found bool) {
	wordLen := len(word)
	for row_i := 0; row_i < g.rows; row_i++ {
		for col_i := 0; col_i < g.cols; col_i++ {
			for _, direction := range DIRECTIONS {
				if g.isMatch(word, row_i, col_i, direction, wordLen) {
					startLocation := [2]int{col_i, row_i}
					endLocation := g.endLocation(startLocation, direction, wordLen)
					return [2][2]int{startLocation, endLocation}, true
				}
			}
		}
	}
	return NOT_FOUND_LINE, false
}

func (g Grid) isMatch(word string, row int, col int, direction string, wordLen int) bool {
	gridWord := make([]rune, 0, wordLen)
	dirFunc := g.directions[direction]

	for i := 0; i < wordLen; i++ {
		char, ok := dirFunc(row, col, i)
		if !ok {
			return false
		}
		gridWord = append(gridWord, char)
	}
	return string(gridWord) == word
}

func (g Grid) endLocation(startLoc [2]int, direction string, wordLen int) (endLoc [2]int) {
	col, row := startLoc[0], startLoc[1]
	delta := wordLen - 1
	switch direction {
	case NORTH:
		return [2]int{col, row - delta}
	case EAST:
		return [2]int{col + delta, row}
	case SOUTH:
		return [2]int{col, row + delta}
	case WEST:
		return [2]int{col - delta, row}
	case NORTH_EAST:
		return [2]int{col + delta, row - delta}
	case NORTH_WEST:
		return [2]int{col - delta, row - delta}
	case SOUTH_EAST:
		return [2]int{col + delta, row + delta}
	case SOUTH_WEST:
		return [2]int{col - delta, row + delta}
	default:
		panic(fmt.Sprintf("invalid direction %v", direction))
	}
}