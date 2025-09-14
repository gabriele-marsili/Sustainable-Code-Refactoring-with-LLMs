package kindergarten

import (
	"fmt"
	"sort"
	"strings"
)

//Garden lists plants owned by students in a kindergarten garden.
type Garden map[string][]string

//plantNames are the code used to idetify each plant.
var plantNames = map[rune]string{
	'R': "radishes",
	'C': "clover",
	'G': "grass",
	'V': "violets",
}

/*NewGarden creates a new kindergarten garden.*/
func NewGarden(diagram string, children []string) (*Garden, error) {
	if len(diagram) == 0 || diagram[0] != '\n' {
		return nil, fmt.Errorf("Not a valid garden format")
	}

	sortedChildren := make([]string, len(children))
	copy(sortedChildren, children)
	sort.Strings(sortedChildren)
	
	childSet := make(map[string]bool, len(sortedChildren))
	for _, child := range sortedChildren {
		if childSet[child] {
			return nil, fmt.Errorf("Child is listed twice %s", child)
		}
		childSet[child] = true
	}

	rows := strings.Split(diagram[1:], "\n")
	if len(rows) == 0 {
		return nil, fmt.Errorf("Not a valid garden format: %q", diagram)
	}

	rowLen := len(rows[0])
	garden := make(Garden, len(sortedChildren))

	for _, row := range rows {
		if len(row) != rowLen {
			return nil, fmt.Errorf("Not a valid garden format: %q", diagram)
		}
		
		for p, plantCode := range row {
			plantName, ok := plantNames[plantCode]
			if !ok {
				return nil, fmt.Errorf("Not a valid plant code")
			}
			
			childIndex := p / 2
			if childIndex >= len(sortedChildren) {
				return nil, fmt.Errorf("Not enough childeren")
			}
			
			child := sortedChildren[childIndex]
			garden[child] = append(garden[child], plantName)
		}
	}
	
	return &garden, nil
}

/*Plants lists the plants owned by a child in the garden.*/
func (g Garden) Plants(child string) ([]string, bool) {
	plants, ok := g[child]
	return plants, ok
}