package kindergarten

import (
	"errors"
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
		return nil, errors.New("invalid diagram")
	}
	if !isValidNames(children) {
		return nil, errors.New("invalid names")
	}
	sort.Strings(children)
	childMap := make(map[string]int, len(children))
	for i, child := range children {
		childMap[child] = i
	}
	return &Garden{diagram: getDiagramRows(diagram), children: childMap}, nil
}

func (g *Garden) Plants(child string) ([]string, bool) {
	index, ok := g.children[child]
	if !ok {
		return nil, false
	}
	column := index * 2
	plants := []string{
		cupCodeToPlant[g.diagram[0][column]],
		cupCodeToPlant[g.diagram[0][column+1]],
		cupCodeToPlant[g.diagram[1][column]],
		cupCodeToPlant[g.diagram[1][column+1]],
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