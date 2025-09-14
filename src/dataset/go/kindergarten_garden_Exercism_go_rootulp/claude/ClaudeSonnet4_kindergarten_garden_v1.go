package kindergarten

import (
	"fmt"
	"sort"
	"strings"
)

// Define the Garden type here.
type Garden struct {
	diagram  []string
	children []string
	childMap map[string]int
}

var cupCodeToPlant = map[byte]string{
	'R': "radishes",
	'C': "clover",
	'G': "grass",
	'V': "violets",
}

func NewGarden(diagram string, children []string) (*Garden, error) {
	if !strings.HasPrefix(diagram, "\n") {
		return &Garden{}, fmt.Errorf("invalid diagram")
	}
	
	rows := getDiagramRows(diagram)
	if len(rows) != 2 || len(rows[0]) != len(rows[1]) || len(rows[0])%2 != 0 {
		return &Garden{}, fmt.Errorf("invalid diagram")
	}
	
	// Validate cup codes in one pass
	for _, row := range rows {
		for i := 0; i < len(row); i++ {
			if _, ok := cupCodeToPlant[row[i]]; !ok {
				return &Garden{}, fmt.Errorf("invalid diagram")
			}
		}
	}
	
	// Check for duplicate names and create map
	childMap := make(map[string]int, len(children))
	for _, name := range children {
		if _, exists := childMap[name]; exists {
			return &Garden{}, fmt.Errorf("invalid names")
		}
		childMap[name] = 0 // temporary value
	}
	
	clone := make([]string, len(children))
	copy(clone, children)
	sort.Strings(clone)
	
	// Update map with sorted indices
	for i, name := range clone {
		childMap[name] = i
	}
	
	return &Garden{diagram: rows, children: clone, childMap: childMap}, nil
}

func (g *Garden) Plants(child string) (plants []string, ok bool) {
	index, exists := g.childMap[child]
	if !exists {
		return []string{}, false
	}
	
	column := index * 2
	plants = make([]string, 4)
	plants[0] = cupCodeToPlant[g.diagram[0][column]]
	plants[1] = cupCodeToPlant[g.diagram[0][column+1]]
	plants[2] = cupCodeToPlant[g.diagram[1][column]]
	plants[3] = cupCodeToPlant[g.diagram[1][column+1]]
	
	return plants, true
}

func getDiagramRows(diagram string) []string {
	trimmed := strings.Trim(diagram, "\n")
	return strings.Split(trimmed, "\n")
}