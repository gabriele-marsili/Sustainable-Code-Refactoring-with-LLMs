package kindergarten

import (
	"fmt"
	"sort"
	"strings"
)

type Garden struct {
	diagram  []string
	children []string
}

var cupCodeToPlant = map[string]string{
	"R": "radishes",
	"C": "clover",
	"G": "grass",
	"V": "violets",
}

func NewGarden(diagram string, children []string) (*Garden, error) {
	if !strings.HasPrefix(diagram, "\n") {
		return &Garden{}, fmt.Errorf("invalid diagram")
	}
	
	rows := getDiagramRows(diagram)
	if len(rows) != 2 || len(rows[0]) != len(rows[1]) || len(rows[0])%2 != 0 {
		return &Garden{}, fmt.Errorf("invalid diagram")
	}
	
	for _, row := range rows {
		for i := 0; i < len(row); i++ {
			if _, ok := cupCodeToPlant[string(row[i])]; !ok {
				return &Garden{}, fmt.Errorf("invalid diagram")
			}
		}
	}
	
	seen := make(map[string]bool, len(children))
	for _, name := range children {
		if seen[name] {
			return &Garden{}, fmt.Errorf("invalid names")
		}
		seen[name] = true
	}
	
	clone := make([]string, len(children))
	copy(clone, children)
	sort.Strings(clone)
	
	return &Garden{diagram: rows, children: clone}, nil
}

func (g *Garden) Plants(child string) (plants []string, ok bool) {
	index := sort.SearchStrings(g.children, child)
	if index >= len(g.children) || g.children[index] != child {
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

func getDiagramRows(diagram string) []string {
	trimmed := strings.Trim(diagram, "\n")
	return strings.Split(trimmed, "\n")
}