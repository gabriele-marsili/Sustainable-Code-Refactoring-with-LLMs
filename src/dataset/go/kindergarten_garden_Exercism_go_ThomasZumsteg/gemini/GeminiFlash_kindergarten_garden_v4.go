package kindergarten

import (
	"fmt"
	"sort"
	"strings"
)

// Garden lists plants owned by students in a kindergarten garden.
type Garden map[string][]string

// plantNames are the code used to idetify each plant.
var plantNames = map[rune]string{
	'R': "radishes",
	'C': "clover",
	'G': "grass",
	'V': "violets",
}

/*NewGarden creates a new kindergarten garden.*/
func NewGarden(diagram string, children []string) (*Garden, error) {
	if len(diagram) <= 0 || diagram[0] != '\n' {
		return nil, fmt.Errorf("Not a valid garden format")
	}

	sortedChildren := make([]string, len(children))
	copy(sortedChildren, children)
	sort.Strings(sortedChildren)

	for i := 1; i < len(sortedChildren); i++ {
		if sortedChildren[i-1] == sortedChildren[i] {
			return nil, fmt.Errorf("Child is listed twice %s", sortedChildren[i])
		}
	}

	garden := make(Garden, len(sortedChildren))
	rows := strings.Split(diagram[1:], "\n")
	rowLen := len(rows[0])

	for _, row := range rows {
		if len(row) != rowLen {
			return nil, fmt.Errorf("Not a valid garden format: %q", diagram)
		}
	}

	if len(sortedChildren)*2 > rowLen {
		return nil, fmt.Errorf("Not enough children")
	}

	for i, child := range sortedChildren {
		plants := make([]string, 0, 2)
		for j := 0; j < 2; j++ {
			plantCode := rune(rows[0][i*2+j])
			plantName, ok := plantNames[plantCode]
			if !ok {
				return nil, fmt.Errorf("Not a valid plant code")
			}
			plants = append(plants, plantName)
		}
		for j := 0; j < 2; j++ {
			plantCode := rune(rows[1][i*2+j])
			plantName, ok := plantNames[plantCode]
			if !ok {
				return nil, fmt.Errorf("Not a valid plant code")
			}
			plants = append(plants, plantName)
		}
		garden[child] = plants
	}

	return &garden, nil
}

/*Plants lists the plants owned by a child in the garden.*/
func (g Garden) Plants(child string) ([]string, bool) {
	plants, ok := g[child]
	return plants, ok
}