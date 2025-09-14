package wordsearch

import (
	"fmt"
)

const NORTH = "NORTH"
const EAST = "EAST"
const SOUTH = "SOUTH"
const WEST = "WEST"
const NORTH_EAST = "NORTH_EAST"
const NORTH_WEST = "NORTH_WEST"
const SOUTH_EAST = "SOUTH_EAST"
const SOUTH_WEST = "SOUTH_WEST"

var DIRECTIONS = []string{NORTH, EAST, SOUTH, WEST, NORTH_EAST, NORTH_WEST, SOUTH_EAST, SOUTH_WEST}
var NOT_FOUND_POINT = [2]int{-1, -1}
var NOT_FOUND_LINE = [2][2]int{NOT_FOUND_POINT, NOT_FOUND_POINT}

var directionDeltas = map[string][2]int{
	NORTH:      {0, -1},
	EAST:       {1, 0},
	SOUTH:      {0, 1},
	WEST:       {-1, 0},
	NORTH_EAST: {1, -1},
	NORTH_WEST: {-1, -1},
	SOUTH_EAST: {1, 1},
	SOUTH_WEST: {-1, 1},
}

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
			if g.grid[row][col] != wordRunes[0] {
				continue
			}
			
			for _, direction := range DIRECTIONS {
				if g.isMatchOptimized(wordRunes, wordLen, row, col, direction) {
					startLocation := [2]int{col, row}
					endLocation := g.endLocationOptimized(startLocation, direction, wordLen)
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

func (g Grid) isMatchOptimized(wordRunes []rune, wordLen, row, col int, direction string) bool {
	delta := directionDeltas[direction]
	dx, dy := delta[0], delta[1]
	
	for i := 0; i < wordLen; i++ {
		newRow := row + i*dy
		newCol := col + i*dx
		
		if newRow < 0 || newRow >= g.rows || newCol < 0 || newCol >= g.cols {
			return false
		}
		
		if g.grid[newRow][newCol] != wordRunes[i] {
			return false
		}
	}
	return true
}

func (g Grid) endLocationOptimized(startLoc [2]int, direction string, wordLen int) [2]int {
	delta := directionDeltas[direction]
	dx, dy := delta[0], delta[1]
	offset := wordLen - 1
	
	return [2]int{
		startLoc[0] + offset*dx,
		startLoc[1] + offset*dy,
	}
}

func isMatch(grid Grid, word string, row int, col int, direction string) bool {
	wordRunes := []rune(word)
	return grid.isMatchOptimized(wordRunes, len(wordRunes), row, col, direction)
}

func endLocation(startLoc [2]int, direction string, word string) (endLoc [2]int) {
	delta := len(word) - 1
	switch direction {
	case NORTH:
		return [2]int{startLoc[0], startLoc[1] - delta}
	case EAST:
		return [2]int{startLoc[0] + delta, startLoc[1]}
	case SOUTH:
		return [2]int{startLoc[0], startLoc[1] + delta}
	case WEST:
		return [2]int{startLoc[0] - delta, startLoc[1]}
	case NORTH_EAST:
		return [2]int{startLoc[0] + delta, startLoc[1] - delta}
	case NORTH_WEST:
		return [2]int{startLoc[0] - delta, startLoc[1] - delta}
	case SOUTH_EAST:
		return [2]int{startLoc[0] + delta, startLoc[1] + delta}
	case SOUTH_WEST:
		return [2]int{startLoc[0] - delta, startLoc[1] + delta}
	default:
		panic(fmt.Sprintf("invalid direction %v", direction))
	}
}