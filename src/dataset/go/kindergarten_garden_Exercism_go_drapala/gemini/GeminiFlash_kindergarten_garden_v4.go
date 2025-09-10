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
		return nil, fmt.Errorf("invalid input: diagram or children cannot be empty")
	}

	if diagram[0] != '\n' {
		return nil, fmt.Errorf("diagram must start with a newline")
	}

	rows := strings.Split(diagram, "\n")
	rows = rows[1:]

	if len(rows) != 2 || len(rows[0]) != len(rows[1]) || len(rows[0])%2 != 0 {
		return nil, fmt.Errorf("rows are badly formatted")
	}

	numChildren := len(children)
	if len(rows[0])/2 != numChildren {
		//return nil, fmt.Errorf("number of children does not match diagram")
	}

	childrenSorted := make([]string, len(children))
	copy(childrenSorted, children)
	sort.Strings(childrenSorted)

	garden := &Garden{
		lookup: make(map[string][]string, len(children)),
	}

	for _, child := range childrenSorted {
		if _, ok := garden.lookup[child]; ok {
			return nil, fmt.Errorf("duplicated child name")
		}

		plants := make([]string, 0, 4)
		childIndex := -1
		for i, c := range childrenSorted {
			if c == child {
				childIndex = i
				break
			}
		}
		if childIndex == -1 {
			return nil, fmt.Errorf("child not found after sorting")
		}

		plantCode1 := rows[0][2*childIndex]
		plantCode2 := rows[0][2*childIndex+1]
		plantCode3 := rows[1][2*childIndex]
		plantCode4 := rows[1][2*childIndex+1]

		plant1, ok1 := plantMap[plantCode1]
		plant2, ok2 := plantMap[plantCode2]
		plant3, ok3 := plantMap[plantCode3]
		plant4, ok4 := plantMap[plantCode4]

		if !ok1 || !ok2 || !ok3 || !ok4 {
			return nil, fmt.Errorf("invalid cup code")
		}

		plants = append(plants, plant1, plant2, plant3, plant4)
		garden.lookup[child] = plants
	}

	return garden, nil
}

// Method takes in name of child and returns the plants for that child as an array
// The boolean indicates whether the child was found in the garden
func (g *Garden) Plants(child string) ([]string, bool) {
	plants, ok := g.lookup[child]
	return plants, ok
}