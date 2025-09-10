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
}

var cupCodeToPlant = map[rune]string{
	'R': "radishes",
	'C': "clover",
	'G': "grass",
	'V': "violets",
}

// The diagram argument starts each row with a '\n'.  This allows Go's
// raw string literals to present diagrams in source code nicely as two
// rows flush left, for example,
//
//     diagram := `
//     VVCCGG
//     VVCCGG`

func NewGarden(diagram string, children []string) (*Garden, error) {
	if !isValidDiagram(diagram) {
		return &Garden{}, fmt.Errorf("invalid diagram")
	}
	if !isValidNames(children) {
		return &Garden{}, fmt.Errorf("invalid names")
	}
	sortedChildren := make([]string, len(children))
	copy(sortedChildren, children)
	sort.Strings(sortedChildren)
	rows := getDiagramRows(diagram)
	return &Garden{diagram: rows, children: sortedChildren}, nil
}

func (g *Garden) Plants(child string) (plants []string, ok bool) {
	index := sort.SearchStrings(g.children, child)
	if index >= len(g.children) || g.children[index] != child {
		return []string{}, false
	}

	column := index * 2
	plants = make([]string, 4)
	plants[0] = cupCodeToPlant[rune(g.diagram[0][column])]
	plants[1] = cupCodeToPlant[rune(g.diagram[0][column+1])]
	plants[2] = cupCodeToPlant[rune(g.diagram[1][column])]
	plants[3] = cupCodeToPlant[rune(g.diagram[1][column+1])]

	return plants, true
}

func isValidNames(names []string) bool {
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
	if len(rows) != 2 {
		return false
	}
	rowLength := len(rows[0])
	if rowLength != len(rows[1]) || rowLength%2 != 0 {
		return false
	}

	for _, row := range rows {
		for _, cupCode := range row {
			if _, ok := cupCodeToPlant[rune(cupCode)]; !ok {
				return false
			}
		}
	}
	return true
}

func getDiagramRows(diagram string) []string {
	trimmed := strings.TrimPrefix(diagram, "\n")
	return strings.Split(trimmed, "\n")
}