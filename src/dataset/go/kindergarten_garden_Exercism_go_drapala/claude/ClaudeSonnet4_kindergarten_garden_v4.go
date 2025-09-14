package kindergarten

import (
	"fmt"
	"sort"
	"strings"
)

type Garden struct {
	lookup map[string][]string
}

var plantMap = map[byte]string{
	'V': "violets",
	'R': "radishes",
	'C': "clover",
	'G': "grass",
}

func NewGarden(diagram string, children []string) (*Garden, error) {
	if len(diagram) == 0 || diagram[0] != '\n' {
		return nil, fmt.Errorf("diagram must start with a newline")
	}

	rows := strings.Split(diagram[1:], "\n")
	if len(rows) != 2 {
		return nil, fmt.Errorf("rows are badly formatted")
	}

	row1, row2 := rows[0], rows[1]
	if len(row1) != len(row2) || len(row1)%2 != 0 {
		return nil, fmt.Errorf("rows are badly formatted")
	}

	numChildren := len(row1) / 2
	if len(children) != numChildren {
		return nil, fmt.Errorf("children count mismatch")
	}

	childrenSorted := make([]string, len(children))
	copy(childrenSorted, children)
	sort.Strings(childrenSorted)

	seen := make(map[string]bool, len(children))
	lookup := make(map[string][]string, len(children))

	for i, child := range childrenSorted {
		if seen[child] {
			return nil, fmt.Errorf("duplicated child name")
		}
		seen[child] = true

		pos := i * 2
		plant1, ok1 := plantMap[row1[pos]]
		plant2, ok2 := plantMap[row1[pos+1]]
		plant3, ok3 := plantMap[row2[pos]]
		plant4, ok4 := plantMap[row2[pos+1]]

		if !ok1 || !ok2 || !ok3 || !ok4 {
			return nil, fmt.Errorf("invalid cup code")
		}

		lookup[child] = []string{plant1, plant2, plant3, plant4}
	}

	return &Garden{lookup: lookup}, nil
}

func (g *Garden) Plants(child string) ([]string, bool) {
	plants, ok := g.lookup[child]
	return plants, ok
}