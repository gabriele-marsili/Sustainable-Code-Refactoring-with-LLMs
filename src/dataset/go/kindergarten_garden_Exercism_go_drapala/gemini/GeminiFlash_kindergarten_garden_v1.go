package kindergarten

import (
	"fmt"
	"sort"
	"strings"
)

// Garden represents the garden with plant assignments.
type Garden struct {
	lookup map[string][]string
}

var plantMap = map[byte]string{
	'V': "violets",
	'R': "radishes",
	'C': "clover",
	'G': "grass",
}

// NewGarden creates a new Garden.
func NewGarden(diagram string, children []string) (*Garden, error) {
	if len(diagram) == 0 || diagram[0] != '\n' {
		return nil, fmt.Errorf("diagram must start with a newline")
	}

	rows := strings.SplitN(diagram, "\n", 3)
	if len(rows) != 3 {
		return nil, fmt.Errorf("diagram must have two rows of plants")
	}
	row1, row2 := rows[1], rows[2]

	if len(row1) != len(row2) || len(row1)%2 != 0 {
		return nil, fmt.Errorf("rows are badly formatted")
	}

	numChildren := len(row1) / 2

	if len(children) > numChildren {
		return nil, fmt.Errorf("too many children for the diagram")
	}

	childrenSorted := make([]string, len(children))
	copy(childrenSorted, children)
	sort.Strings(childrenSorted)

	garden := &Garden{
		lookup: make(map[string][]string, len(children)),
	}

	for i, child := range childrenSorted {
		if _, ok := garden.lookup[child]; ok {
			return nil, fmt.Errorf("duplicated child name")
		}

		plants := make([]string, 0, 4)
		plant1, ok1 := plantMap[row1[2*i]]
		plant2, ok2 := plantMap[row1[2*i+1]]
		plant3, ok3 := plantMap[row2[2*i]]
		plant4, ok4 := plantMap[row2[2*i+1]]

		if !ok1 || !ok2 || !ok3 || !ok4 {
			return nil, fmt.Errorf("invalid cup code")
		}

		plants = append(plants, plant1, plant2, plant3, plant4)
		garden.lookup[child] = plants
	}

	return garden, nil
}

// Plants returns the plants for a given child.
func (g *Garden) Plants(child string) ([]string, bool) {
	plants, ok := g.lookup[child]
	return plants, ok
}