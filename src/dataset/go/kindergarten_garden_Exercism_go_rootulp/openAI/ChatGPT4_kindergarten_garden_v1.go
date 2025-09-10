package kindergarten

import (
	"errors"
	"sort"
	"strings"
)

type Garden struct {
	diagram  []string
	children []string
}

var cupCodeToPlant = map[byte]string{
	'R': "radishes",
	'C': "clover",
	'G': "grass",
	'V': "violets",
}

func NewGarden(diagram string, children []string) (*Garden, error) {
	if !isValidDiagram(diagram) {
		return nil, errors.New("invalid diagram")
	}
	if !isValidNames(children) {
		return nil, errors.New("invalid names")
	}
	sort.Strings(children)
	return &Garden{diagram: getDiagramRows(diagram), children: children}, nil
}

func (g *Garden) Plants(child string) ([]string, bool) {
	index := sort.SearchStrings(g.children, child)
	if index >= len(g.children) || g.children[index] != child {
		return nil, false
	}
	column := index * 2
	cups := []byte{
		g.diagram[0][column],
		g.diagram[0][column+1],
		g.diagram[1][column],
		g.diagram[1][column+1],
	}
	plants := make([]string, 4)
	for i, cup := range cups {
		plants[i] = cupCodeToPlant[cup]
	}
	return plants, true
}

func isValidNames(names []string) bool {
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
	return strings.Split(strings.TrimSpace(diagram), "\n")
}