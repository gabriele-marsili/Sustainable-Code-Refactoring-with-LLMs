package kindergarten

import (
	"errors"
	"sort"
	"strings"
)

type Garden struct {
	diagram  [2]string
	children []string
}

var cupCodeToPlant = map[byte]string{
	'R': "radishes",
	'C': "clover",
	'G': "grass",
	'V': "violets",
}

func NewGarden(diagram string, children []string) (*Garden, error) {
	rows := strings.Split(strings.TrimSpace(diagram), "\n")
	if len(rows) != 2 || len(rows[0]) != len(rows[1]) || len(rows[0])%2 != 0 {
		return nil, errors.New("invalid diagram")
	}
	seen := make(map[string]struct{}, len(children))
	for _, name := range children {
		if _, exists := seen[name]; exists {
			return nil, errors.New("duplicate names")
		}
		seen[name] = struct{}{}
	}
	for _, row := range rows {
		for i := 0; i < len(row); i++ {
			if _, ok := cupCodeToPlant[row[i]]; !ok {
				return nil, errors.New("invalid cup code")
			}
		}
	}
	sortedChildren := append([]string(nil), children...)
	sort.Strings(sortedChildren)
	return &Garden{diagram: [2]string{rows[0], rows[1]}, children: sortedChildren}, nil
}

func (g *Garden) Plants(child string) ([]string, bool) {
	index := sort.SearchStrings(g.children, child)
	if index >= len(g.children) || g.children[index] != child {
		return nil, false
	}
	column := index * 2
	return []string{
		cupCodeToPlant[g.diagram[0][column]],
		cupCodeToPlant[g.diagram[0][column+1]],
		cupCodeToPlant[g.diagram[1][column]],
		cupCodeToPlant[g.diagram[1][column+1]],
	}, true
}