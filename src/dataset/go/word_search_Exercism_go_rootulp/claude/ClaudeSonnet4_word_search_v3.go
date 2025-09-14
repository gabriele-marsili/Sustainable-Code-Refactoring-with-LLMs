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

var directionNames = [8]string{"NORTH", "EAST", "SOUTH", "WEST", "NORTH_EAST", "NORTH_WEST", "SOUTH_EAST", "SOUTH_WEST"}
var directionDeltas = [8][2]int{
	{0, -1}, {1, 0}, {0, 1}, {-1, 0},
	{1, -1}, {-1, -1}, {1, 1}, {-1, 1},
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
	buffer []rune
}

func NewGrid(puzzle []string) *Grid {
	if len(puzzle) == 0 {
		return &Grid{}
	}
	
	rows := len(puzzle)
	cols := len(puzzle[0])
	grid := make([][]rune, rows)
	maxWordLen := 0
	
	for i, row := range puzzle {
		grid[i] = []rune(row)
		if len(row) > maxWordLen {
			maxWordLen = len(row)
		}
	}
	
	return &Grid{
		grid:   grid,
		rows:   rows,
		cols:   cols,
		buffer: make([]rune, maxWordLen),
	}
}

func (g Grid) String() string {
	return fmt.Sprintf("%v", g.grid)
}

func (g *Grid) Search(word string) (result [2][2]int, found bool) {
	if len(word) == 0 || g.rows == 0 || g.cols == 0 {
		return NOT_FOUND_LINE, false
	}
	
	wordRunes := []rune(word)
	wordLen := len(wordRunes)
	
	for row := 0; row < g.rows; row++ {
		for col := 0; col < g.cols; col++ {
			for dir := Direction(0); dir < 8; dir++ {
				if g.isMatchOptimized(wordRunes, row, col, dir) {
					startLocation := [2]int{col, row}
					endLocation := g.endLocationOptimized(startLocation, dir, wordLen)
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

func (g *Grid) isMatchOptimized(wordRunes []rune, row, col int, dir Direction) bool {
	dx, dy := directionDeltas[dir][0], directionDeltas[dir][1]
	
	for i, expectedRune := range wordRunes {
		newRow := row + i*dy
		newCol := col + i*dx
		
		if newRow < 0 || newRow >= g.rows || newCol < 0 || newCol >= g.cols {
			return false
		}
		
		if g.grid[newRow][newCol] != expectedRune {
			return false
		}
	}
	return true
}

func (g *Grid) endLocationOptimized(startLoc [2]int, dir Direction, wordLen int) [2]int {
	col, row := startLoc[0], startLoc[1]
	delta := wordLen - 1
	dx, dy := directionDeltas[dir][0], directionDeltas[dir][1]
	return [2]int{col + delta*dx, row + delta*dy}
}

func isMatch(grid Grid, word string, row int, col int, direction string) bool {
	wordRunes := []rune(word)
	var dir Direction
	
	switch direction {
	case NORTH_STR:
		dir = NORTH
	case EAST_STR:
		dir = EAST
	case SOUTH_STR:
		dir = SOUTH
	case WEST_STR:
		dir = WEST
	case NORTH_EAST_STR:
		dir = NORTH_EAST
	case NORTH_WEST_STR:
		dir = NORTH_WEST
	case SOUTH_EAST_STR:
		dir = SOUTH_EAST
	case SOUTH_WEST_STR:
		dir = SOUTH_WEST
	default:
		return false
	}
	
	return grid.isMatchOptimized(wordRunes, row, col, dir)
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