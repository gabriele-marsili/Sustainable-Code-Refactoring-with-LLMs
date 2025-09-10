package kindergarten

import (
	"errors"
	"sort"
	"strings"
)

// Define the Garden type here.
type Garden struct {
	lookup map[string][]string
}

var plantMap = map[byte]string{
	'V': "violets",
	'R': "radishes",
	'C': "clover",
	'G': "grass",
}

// NewGarden initializes a new Garden and returns the pointer.
// Error if any inputs are incorrect.
func NewGarden(diagram string, children []string) (*Garden, error) {
	if len(diagram) == 0 || diagram[0] != '\n' {
		return nil, errors.New("diagram must start with a newline")
	}

	rows := strings.Split(strings.TrimSpace(diagram), "\n")
	if len(rows) != 2 || len(rows[0]) != len(rows[1]) || len(rows[0])%2 != 0 {
		return nil, errors.New("rows are badly formatted")
	}

	childrenSorted := append([]string(nil), children...)
	sort.Strings(childrenSorted)

	if len(childrenSorted)*2 != len(rows[0]) {
		return nil, errors.New("number of children does not match diagram")
	}

	lookup := make(map[string][]string, len(childrenSorted))
	for i, child := range childrenSorted {
		if _, exists := lookup[child]; exists {
			return nil, errors.New("duplicated child name")
		}

		start := i * 2
		end := start + 2
		plants := []string{
			plantMap[rows[0][start]],
			plantMap[rows[0][start+1]],
			plantMap[rows[1][start]],
			plantMap[rows[1][start+1]],
		}

		for _, plant := range plants {
			if plant == "" {
				return nil, errors.New("invalid cup code")
			}
		}

		lookup[child] = plants
	}

	return &Garden{lookup: lookup}, nil
}

// Plants takes in the name of a child and returns the plants for that child as an array.
// The boolean indicates whether the child was found in the garden.
func (g *Garden) Plants(child string) ([]string, bool) {
	plants, ok := g.lookup[child]
	return plants, ok
}