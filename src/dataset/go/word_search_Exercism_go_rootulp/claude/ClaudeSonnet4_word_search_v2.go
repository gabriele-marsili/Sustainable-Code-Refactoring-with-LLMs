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

var directions = [8]Direction{NORTH, EAST, SOUTH, WEST, NORTH_EAST, NORTH_WEST, SOUTH_EAST, SOUTH_WEST}
var directionDeltas = [8][2]int{
	{0, -1},  // NORTH
	{1, 0},   // EAST
	{0, 1},   // SOUTH
	{-1, 0},  // WEST
	{1, -1},  // NORTH_EAST
	{-1, -1}, // NORTH_WEST
	{1, 1},   // SOUTH_EAST
	{-1, 1},  // SOUTH_WEST
}

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

func (g *Grid) Search(word string) (result [2][2]int, found bool) {
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
			
			for _, direction := range directions {
				if g.isMatch(wordRunes, wordLen, row, col, direction) {
					startLocation := [2]int{col, row}
					endLocation := g.endLocation(startLocation, direction, wordLen)
					return [2][2]int{startLocation, endLocation}, true
				}
			}
		}
	}
	return NOT_FOUND_LINE, false
}

func (g *Grid) isMatch(wordRunes []rune, wordLen int, startRow, startCol int, direction Direction) bool {
	delta := directionDeltas[direction]
	dx, dy := delta[0], delta[1]
	
	for i := 0; i < wordLen; i++ {
		row := startRow + i*dy
		col := startCol + i*dx
		
		if row < 0 || row >= g.rows || col < 0 || col >= g.cols {
			return false
		}
		
		if g.grid[row][col] != wordRunes[i] {
			return false
		}
	}
	return true
}

func (g *Grid) endLocation(startLoc [2]int, direction Direction, wordLen int) [2]int {
	col, row := startLoc[0], startLoc[1]
	delta := directionDeltas[direction]
	dx, dy := delta[0], delta[1]
	offset := wordLen - 1
	return [2]int{col + offset*dx, row + offset*dy}
}