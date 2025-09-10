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

var DIRECTIONS = []struct {
	name string
	dx   int
	dy   int
}{
	{name: NORTH, dx: 0, dy: -1},
	{name: EAST, dx: 1, dy: 0},
	{name: SOUTH, dx: 0, dy: 1},
	{name: WEST, dx: -1, dy: 0},
	{name: NORTH_EAST, dx: 1, dy: -1},
	{name: NORTH_WEST, dx: -1, dy: -1},
	{name: SOUTH_EAST, dx: 1, dy: 1},
	{name: SOUTH_WEST, dx: -1, dy: 1},
}

var NOT_FOUND_POINT = [2]int{-1, -1}
var NOT_FOUND_LINE = [2][2]int{NOT_FOUND_POINT, NOT_FOUND_POINT}

func Solve(words []string, puzzle []string) (result map[string][2][2]int, err error) {
	grid := NewGrid(puzzle)
	result = make(map[string][2][2]int)
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

func (g Grid) String() string {
	return fmt.Sprintf("%v", g.grid)
}

func (g Grid) Search(word string) (result [2][2]int, found bool) {
	wordRunes := []rune(word)
	wordLen := len(wordRunes)

	for row_i, row := range g.grid {
		for col_i := range row {
			for _, dir := range DIRECTIONS {
				if g.isMatch(wordRunes, row_i, col_i, dir.dx, dir.dy, wordLen) {
					startLocation := [2]int{col_i, row_i}
					endLocation := [2]int{col_i + dir.dx*(wordLen-1), row_i + dir.dy*(wordLen-1)}
					return [2][2]int{startLocation, endLocation}, true
				}
			}
		}
	}
	return NOT_FOUND_LINE, false
}

func (g Grid) SafeGet(row int, col int) (rune, bool) {
	if row < 0 || row >= len(g.grid) || col < 0 || col >= len(g.grid[row]) {
		return ' ', false
	}
	return g.grid[row][col], true
}

func (g Grid) isMatch(word []rune, row, col, dx, dy, wordLen int) bool {
	for i := 0; i < wordLen; i++ {
		char, ok := g.SafeGet(row+dy*i, col+dx*i)
		if !ok || char != word[i] {
			return false
		}
	}
	return true
}