package kindergarten

import (
	"fmt"
	"sort"
	"strings"
)

type Garden struct {
	diagram  []string
	children []string
	childMap map[string]int
}

var cupCodeToPlant = map[string]string{
	"R": "radishes",
	"C": "clover",
	"G": "grass",
	"V": "violets",
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
	
	childMap := make(map[string]int, len(clone))
	for i, child := range clone {
		childMap[child] = i
	}
	
	return &Garden{
		diagram:  getDiagramRows(diagram),
		children: clone,
		childMap: childMap,
	}, nil
}

func (g *Garden) Plants(child string) (plants []string, ok bool) {
	index, exists := g.childMap[child]
	if !exists {
		return []string{}, false
	}
	
	column := index * 2
	plants = make([]string, 4)
	plants[0] = cupCodeToPlant[string(g.diagram[0][column])]
	plants[1] = cupCodeToPlant[string(g.diagram[0][column+1])]
	plants[2] = cupCodeToPlant[string(g.diagram[1][column])]
	plants[3] = cupCodeToPlant[string(g.diagram[1][column+1])]
	
	return plants, true
}

func isValidNames(names []string) bool {
	if len(names) == 0 {
		return true
	}
	
	seen := make(map[string]struct{}, len(names))
	for _, name := range names {
		if _, exists := seen[name]; exists {
			return false
		}
		seen[name] = struct{}{}
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
			if _, ok := cupCodeToPlant[string(row[i])]; !ok {
				return false
			}
		}
	}
	return true
}

func isEvenRows(diagram string) bool {
	rows := getDiagramRows(diagram)
	return len(rows[0]) == len(rows[1])
}

func isEvenCups(diagram string) bool {
	rows := getDiagramRows(diagram)
	return len(rows[0])%2 == 0
}

func isValidCupCodes(diagram string) bool {
	rows := getDiagramRows(diagram)
	for _, row := range rows {
		for i := 0; i < len(row); i++ {
			if _, ok := cupCodeToPlant[string(row[i])]; !ok {
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

func indexOf(slice []string, element string) int {
	for i, v := range slice {
		if v == element {
			return i
		}
	}
	return -1
}