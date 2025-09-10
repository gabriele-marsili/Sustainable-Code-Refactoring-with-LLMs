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

var DIRECTIONS = [][2]int{
	{-1, 0},  // NORTH
	{0, 1},   // EAST
	{1, 0},   // SOUTH
	{0, -1},  // WEST
	{-1, 1},  // NORTH_EAST
	{-1, -1}, // NORTH_WEST
	{1, 1},   // SOUTH_EAST
	{1, -1},  // SOUTH_WEST
}

var NOT_FOUND_POINT = [2]int{-1, -1}
var NOT_FOUND_LINE = [2][2]int{NOT_FOUND_POINT, NOT_FOUND_POINT}

func Solve(words []string, puzzle []string) (result map[string][2][2]int, err error) {
	grid := NewGrid(puzzle)
	result = make(map[string][2][2]int, len(words))
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
}

func NewGrid(puzzle []string) *Grid {
	grid := make([][]rune, len(puzzle))
	for i, row := range puzzle {
		grid[i] = []rune(row)
	}
	return &Grid{grid: grid}
}

func (g Grid) Search(word string) (result [2][2]int, found bool) {
	wordLen := len(word)
	for row := 0; row < len(g.grid); row++ {
		for col := 0; col < len(g.grid[row]); col++ {
			for _, dir := range DIRECTIONS {
				if g.isMatch(word, row, col, dir, wordLen) {
					startLocation := [2]int{col, row}
					endLocation := [2]int{col + dir[1]*(wordLen-1), row + dir[0]*(wordLen-1)}
					return [2][2]int{startLocation, endLocation}, true
				}
			}
		}
	}
	return NOT_FOUND_LINE, false
}

func (g Grid) SafeGet(row, col int) (rune, bool) {
	if row >= 0 && row < len(g.grid) && col >= 0 && col < len(g.grid[row]) {
		return g.grid[row][col], true
	}
	return ' ', false
}

func (g Grid) isMatch(word string, row, col int, dir [2]int, wordLen int) bool {
	for i := 0; i < wordLen; i++ {
		char, ok := g.SafeGet(row+dir[0]*i, col+dir[1]*i)
		if !ok || char != rune(word[i]) {
			return false
		}
	}
	return true
}