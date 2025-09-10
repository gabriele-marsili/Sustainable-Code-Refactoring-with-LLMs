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

func Solve(words []string, puzzle []string) (map[string][2][2]int, error) {
	grid := NewGrid(puzzle)
	result := make(map[string][2][2]int, len(words))
	var err error
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
	grid [][]rune
	rows int
	cols int
}

func NewGrid(puzzle []string) *Grid {
	rows := len(puzzle)
	cols := 0
	if rows > 0 {
		cols = len(puzzle[0])
	}
	grid := make([][]rune, rows)
	for i, row := range puzzle {
		grid[i] = []rune(row)
	}
	return &Grid{grid: grid, rows: rows, cols: cols}
}

func (g Grid) Search(word string) ([2][2]int, bool) {
	wordLen := len(word)
	if wordLen == 0 {
		return NOT_FOUND_LINE, false
	}

	for row_i := 0; row_i < g.rows; row_i++ {
		for col_i := 0; col_i < g.cols; col_i++ {
			for _, direction := range DIRECTIONS {
				if g.isMatch(word, row_i, col_i, direction) {
					startLocation := [2]int{col_i, row_i}
					endLocation := g.endLocation(startLocation, direction, wordLen)
					return [2][2]int{startLocation, endLocation}, true
				}
			}
		}
	}
	return NOT_FOUND_LINE, false
}

func (g Grid) SafeGet(row int, col int) (rune, bool) {
	if row < 0 || row >= g.rows || col < 0 || col >= g.cols {
		return ' ', false
	}
	return g.grid[row][col], true
}

func (g Grid) isMatch(word string, row int, col int, direction string) bool {
	for i := 0; i < len(word); i++ {
		var r, c int
		switch direction {
		case NORTH:
			r, c = row-i, col
		case EAST:
			r, c = row, col+i
		case SOUTH:
			r, c = row+i, col
		case WEST:
			r, c = row, col-i
		case NORTH_EAST:
			r, c = row-i, col+i
		case NORTH_WEST:
			r, c = row-i, col-i
		case SOUTH_EAST:
			r, c = row+i, col+i
		case SOUTH_WEST:
			r, c = row+i, col-i
		}

		char, ok := g.SafeGet(r, c)
		if !ok || char != rune(word[i]) {
			return false
		}
	}
	return true
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