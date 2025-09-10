package kindergarten

import (
	"errors"
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
		return nil, errors.New("diagram must start with a newline")
	}

	rows := strings.Split(diagram[1:], "\n")
	if len(rows) != 2 || len(rows[0]) != len(rows[1]) || len(rows[0])%2 != 0 {
		return nil, errors.New("rows are badly formatted")
	}

	childrenSorted := append([]string(nil), children...)
	sort.Strings(childrenSorted)

	if len(childrenSorted)*2 != len(rows[0]) {
		return nil, errors.New("mismatch between children and diagram")
	}

	lookup := make(map[string][]string, len(childrenSorted))
	for i, child := range childrenSorted {
		if _, exists := lookup[child]; exists {
			return nil, errors.New("duplicated child name")
		}

		start := i * 2
		end := start + 2
		plants := make([]string, 0, 4)
		for _, row := range rows {
			for _, cup := range row[start:end] {
				plant, ok := plantMap[byte(cup)]
				if !ok {
					return nil, errors.New("invalid cup code")
				}
				plants = append(plants, plant)
			}
		}
		lookup[child] = plants
	}

	return &Garden{lookup: lookup}, nil
}

func (g *Garden) Plants(child string) ([]string, bool) {
	plants, ok := g.lookup[child]
	return plants, ok
}