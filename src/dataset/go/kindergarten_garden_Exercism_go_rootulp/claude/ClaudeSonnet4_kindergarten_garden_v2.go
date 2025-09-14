package kindergarten

import (
	"fmt"
	"sort"
	"strings"
)

// Define the Garden type here.
type Garden struct {
	diagram  []string
	children map[string]int
}

var cupCodeToPlant = map[byte]string{
	'R': "radishes",
	'C': "clover",
	'G': "grass",
	'V': "violets",
}

func NewGarden(diagram string, children []string) (*Garden, error) {
	if !isValidDiagram(diagram) {
		return &Garden{}, fmt.Errorf("invalid diagram")
	}
	if !isValidNames(children) {
		return &Garden{}, fmt.Errorf("invalid names")
	}
	clone := make([]string, len(children))
	copy(clone, children)
	sort.Strings(clone)
	
	childrenMap := make(map[string]int, len(clone))
	for i, child := range clone {
		childrenMap[child] = i
	}
	
	return &Garden{diagram: getDiagramRows(diagram), children: childrenMap}, nil
}

func (g *Garden) Plants(child string) (plants []string, ok bool) {
	index, exists := g.children[child]
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

func isValidNames(names []string) bool {
	if len(names) == 0 {
		return true
	}
	seen := make(map[string]bool, len(names))
	for _, name := range names {
		if seen[name] {
			return false
		}
		seen[name] = true
	}
	return true
}

func isValidDiagram(diagram string) bool {
	if !strings.HasPrefix(diagram, "\n") {
		return false
	}
	rows := getDiagramRows(diagram)
	if len(rows) != 2 || len(rows[0]) != len(rows[1]) || len(rows[0])%2 != 0 {
		return false
	}
	for _, row := range rows {
		for i := 0; i < len(row); i++ {
			if _, ok := cupCodeToPlant[row[i]]; !ok {
				return false
			}
		}
	}
	return true
}

func getDiagramRows(diagram string) []string {
	trimmed := strings.Trim(diagram, "\n")
	return strings.Split(trimmed, "\n")
}