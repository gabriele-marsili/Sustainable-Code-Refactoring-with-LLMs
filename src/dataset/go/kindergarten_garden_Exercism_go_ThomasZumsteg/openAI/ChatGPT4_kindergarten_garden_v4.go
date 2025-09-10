package kindergarten

import (
	"errors"
	"sort"
	"strings"
)

// Garden lists plants owned by students in a kindergarten garden.
type Garden map[string][]string

// plantNames are the code used to identify each plant.
var plantNames = map[rune]string{
	'R': "radishes",
	'C': "clover",
	'G': "grass",
	'V': "violets",
}

// NewGarden creates a new kindergarten garden.
func NewGarden(diagram string, children []string) (*Garden, error) {
	if len(diagram) <= 1 || diagram[0] != '\n' {
		return nil, errors.New("invalid garden format")
	}

	sortedChildren := append([]string(nil), children...)
	sort.Strings(sortedChildren)

	for i := 1; i < len(sortedChildren); i++ {
		if sortedChildren[i] == sortedChildren[i-1] {
			return nil, errors.New("duplicate child: " + sortedChildren[i])
		}
	}

	rows := strings.Split(diagram[1:], "\n")
	if len(rows) != 2 || len(rows[0]) != len(rows[1]) || len(rows[0])%2 != 0 {
		return nil, errors.New("invalid garden format")
	}

	childCount := len(sortedChildren)
	if len(rows[0])/2 > childCount {
		return nil, errors.New("not enough children")
	}

	garden := make(Garden, childCount)
	for i := 0; i < len(rows[0]); i += 2 {
		child := sortedChildren[i/2]
		garden[child] = append(garden[child],
			plantNames[rune(rows[0][i])], plantNames[rune(rows[0][i+1])],
			plantNames[rune(rows[1][i])], plantNames[rune(rows[1][i+1])],
		)
	}

	return &garden, nil
}

// Plants lists the plants owned by a child in the garden.
func (g Garden) Plants(child string) ([]string, bool) {
	plants, ok := g[child]
	return plants, ok
}