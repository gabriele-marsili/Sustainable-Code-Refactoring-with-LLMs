package kindergarten

import (
	"fmt"
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

// Initiates a new Garden and returns the pointer.
// Error if any inputs are incorrect.
//
// Notes:
// 1. children could be out of order, but diagram is always in order

func NewGarden(diagram string, children []string) (*Garden, error) {
	if len(diagram) == 0 || diagram[0] != '\n' {
		return nil, fmt.Errorf("diagram must start with a newline")
	}

	rows := strings.SplitN(diagram, "\n", 3)
	if len(rows) != 3 {
		return nil, fmt.Errorf("invalid diagram format: expected two rows of plants")
	}
	row1, row2 := rows[1], rows[2]

	if len(row1) != len(row2) || len(row1)%2 != 0 {
		return nil, fmt.Errorf("rows are badly formatted")
	}

	numChildren := len(row1) / 2

	if len(children) > numChildren {
		return nil, fmt.Errorf("too many children for the given diagram")
	}

	childrenSorted := make([]string, len(children))
	copy(childrenSorted, children)
	sort.Strings(childrenSorted)

	g := &Garden{
		lookup: make(map[string][]string, len(children)),
	}

	for i, child := range childrenSorted {
		if _, ok := g.lookup[child]; ok {
			return nil, fmt.Errorf("duplicated child name")
		}

		plants := make([]string, 0, 4)
		plantCodes := []byte{row1[2*i], row1[2*i+1], row2[2*i], row2[2*i+1]}

		for _, code := range plantCodes {
			plant, ok := plantMap[code]
			if !ok {
				return nil, fmt.Errorf("invalid cup code: %c", code)
			}
			plants = append(plants, plant)
		}

		g.lookup[child] = plants
	}

	return g, nil
}

// Method takes in name of child and returns the plants for that child as an array
// The boolean indicates whether the child was found in the garden
func (g *Garden) Plants(child string) ([]string, bool) {
	plants, ok := g.lookup[child]
	return plants, ok
}