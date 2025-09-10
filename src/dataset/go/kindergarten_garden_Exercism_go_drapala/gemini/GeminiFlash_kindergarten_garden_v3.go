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
	if diagram == "" || len(children) == 0 {
		return nil, fmt.Errorf("invalid input")
	}

	if diagram[0] != '\n' {
		return nil, fmt.Errorf("diagram must start with a newline")
	}

	rows := strings.Split(diagram, "\n")
	rows = rows[1:]

	if len(rows) != 2 || len(rows[0]) != len(rows[1]) || len(rows[0])%2 != 0 {
		return nil, fmt.Errorf("rows are badly formatted")
	}

	childrenSorted := make([]string, len(children))
	copy(childrenSorted, children)
	sort.Strings(childrenSorted)

	g := &Garden{
		lookup: make(map[string][]string, len(children)),
	}

	plantBytes := make([][]byte, 2)
	plantBytes[0] = []byte(rows[0])
	plantBytes[1] = []byte(rows[1])

	for i, child := range childrenSorted {
		if _, ok := g.lookup[child]; ok {
			return nil, fmt.Errorf("duplicated child name")
		}

		plants := make([]string, 0, 4)
		for j := 0; j < 2; j++ {
			plant1, ok1 := plantMap[plantBytes[j][2*i]]
			plant2, ok2 := plantMap[plantBytes[j][2*i+1]]

			if !ok1 || !ok2 {
				return nil, fmt.Errorf("invalid cup code")
			}

			plants = append(plants, plant1, plant2)
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