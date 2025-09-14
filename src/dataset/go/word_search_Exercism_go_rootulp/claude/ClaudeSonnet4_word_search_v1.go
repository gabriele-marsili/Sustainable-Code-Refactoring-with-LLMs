package wordsearch

import (
	"fmt"
)

type Direction int

const (
	NORTH Direction = iota
	EAST
	SOUTH
	WEST
	NORTH_EAST
	NORTH_WEST
	SOUTH_EAST
	SOUTH_WEST
)

var directionDeltas = [8][2]int{
	{0, -1}, // NORTH
	{1, 0},  // EAST
	{0, 1},  // SOUTH
	{-1, 0}, // WEST
	{1, -1}, // NORTH_EAST
	{-1, -1}, // NORTH_WEST
	{1, 1},  // SOUTH_EAST
	{-1, 1}, // SOUTH_WEST
}

var directionNames = [8]string{
	"NORTH", "EAST", "SOUTH", "WEST",
	"NORTH_EAST", "NORTH_WEST", "SOUTH_EAST", "SOUTH_WEST",
}

const (
	NORTH_STR      = "NORTH"
	EAST_STR       = "EAST"
	SOUTH_STR      = "SOUTH"
	WEST_STR       = "WEST"
	NORTH_EAST_STR = "NORTH_EAST"
	NORTH_WEST_STR = "NORTH_WEST"
	SOUTH_EAST_STR = "SOUTH_EAST"
	SOUTH_WEST_STR = "SOUTH_WEST"
)

var DIRECTIONS = []string{NORTH_STR, EAST_STR, SOUTH_STR, WEST_STR, NORTH_EAST_STR, NORTH_WEST_STR, SOUTH_EAST_STR, SOUTH_WEST_STR}
var NOT_FOUND_POINT = [2]int{-1, -1}
var NOT_FOUND_LINE = [2][2]int{NOT_FOUND_POINT, NOT_FOUND_POINT}

func Solve(words []string, puzzle []string) (result map[string][2][2]int, err error) {
	grid := NewGrid(puzzle)
	result = make(map[string][2][2]int, len(words))
	for _, word := range words {
		loc, found := grid.Search(word)
		result[word] = loc
		if !found {
			err = fmt.Errorf("word %s not found", word)
		}
	}

	return result, err
}

type Grid struct {
	grid   [][]rune
	rows   int
	cols   int
}

func NewGrid(puzzle []string) *Grid {
	rows := len(puzzle)
	if rows == 0 {
		return &Grid{grid: nil, rows: 0, cols: 0}
	}
	
	cols := len(puzzle[0])
	grid := make([][]rune, rows)
	for i, row := range puzzle {
		grid[i] = []rune(row)
	}
	return &Grid{grid: grid, rows: rows, cols: cols}
}

func (g Grid) String() string {
	return fmt.Sprintf("%v", g.grid)
}

func (g Grid) Search(word string) (result [2][2]int, found bool) {
	if len(word) == 0 {
		return NOT_FOUND_LINE, false
	}
	
	wordRunes := []rune(word)
	wordLen := len(wordRunes)
	
	for row := 0; row < g.rows; row++ {
		for col := 0; col < g.cols; col++ {
			if g.grid[row][col] == wordRunes[0] {
				for dir := 0; dir < 8; dir++ {
					if g.isMatchOptimized(wordRunes, wordLen, row, col, dir) {
						startLocation := [2]int{col, row}
						endLocation := g.endLocationOptimized(startLocation, dir, wordLen)
						return [2][2]int{startLocation, endLocation}, true
					}
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

func (g Grid) isMatchOptimized(wordRunes []rune, wordLen, row, col, direction int) bool {
	dx, dy := directionDeltas[direction][0], directionDeltas[direction][1]
	
	for i := 0; i < wordLen; i++ {
		newRow, newCol := row+i*dy, col+i*dx
		if newRow < 0 || newRow >= g.rows || newCol < 0 || newCol >= g.cols {
			return false
		}
		if g.grid[newRow][newCol] != wordRunes[i] {
			return false
		}
	}
	return true
}

func (g Grid) endLocationOptimized(startLoc [2]int, direction, wordLen int) [2]int {
	col, row := startLoc[0], startLoc[1]
	delta := wordLen - 1
	dx, dy := directionDeltas[direction][0], directionDeltas[direction][1]
	return [2]int{col + delta*dx, row + delta*dy}
}

func isMatch(grid Grid, word string, row int, col int, direction string) bool {
	wordRunes := []rune(word)
	wordLen := len(wordRunes)
	
	var dx, dy int
	switch direction {
	case NORTH_STR:
		dx, dy = 0, -1
	case EAST_STR:
		dx, dy = 1, 0
	case SOUTH_STR:
		dx, dy = 0, 1
	case WEST_STR:
		dx, dy = -1, 0
	case NORTH_EAST_STR:
		dx, dy = 1, -1
	case NORTH_WEST_STR:
		dx, dy = -1, -1
	case SOUTH_EAST_STR:
		dx, dy = 1, 1
	case SOUTH_WEST_STR:
		dx, dy = -1, 1
	}
	
	for i := 0; i < wordLen; i++ {
		if char, ok := grid.SafeGet(row+i*dy, col+i*dx); !ok || char != wordRunes[i] {
			return false
		}
	}
	return true
}

func endLocation(startLoc [2]int, direction string, word string) (endLoc [2]int) {
	col, row := startLoc[0], startLoc[1]
	delta := len(word) - 1
	switch direction {
	case NORTH_STR:
		return [2]int{col, row - delta}
	case EAST_STR:
		return [2]int{col + delta, row}
	case SOUTH_STR:
		return [2]int{col, row + delta}
	case WEST_STR:
		return [2]int{col - delta, row}
	case NORTH_EAST_STR:
		return [2]int{col + delta, row - delta}
	case NORTH_WEST_STR:
		return [2]int{col - delta, row - delta}
	case SOUTH_EAST_STR:
		return [2]int{col + delta, row + delta}
	case SOUTH_WEST_STR:
		return [2]int{col - delta, row + delta}
	default:
		panic(fmt.Sprintf("invalid direction %v", direction))
	}
}