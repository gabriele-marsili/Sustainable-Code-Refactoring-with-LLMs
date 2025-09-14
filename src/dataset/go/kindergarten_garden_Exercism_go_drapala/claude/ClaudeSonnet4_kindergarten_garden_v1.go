package kindergarten

import (
	"fmt"
	"sort"
	"strings"
)

// Define the Garden type here.
type Garden struct {
	lookup map[string][]string
}

var plantMap = map[string]string{
	"V": "violets",
	"R": "radishes",
	"C": "clover",
	"G": "grass",
}

// Initiates a new Garden and returns the pointer.
// Error if any inputs are incorrect.
//
// Notes:
// 1. children could be out of order, but diagram is always in order

func NewGarden(diagram string, children []string) (*Garden, error) {
	// Error handling first to fail fast
	if len(diagram) == 0 || diagram[0] != '\n' {
		return nil, fmt.Errorf("diagram must start with a newline")
	}

	// Decipher diagram
	rows := strings.Split(diagram, "\n")[1:] // Remove the first row which is a newline
	
	if len(rows) != 2 {
		return nil, fmt.Errorf("rows are badly formatted")
	}
	
	rowLen := len(rows[0])
	if rowLen%2 != 0 || rowLen != len(rows[1]) {
		return nil, fmt.Errorf("rows are badly formatted")
	}

	// Check for duplicate children early
	childSet := make(map[string]bool, len(children))
	for _, child := range children {
		if childSet[child] {
			return nil, fmt.Errorf("duplicated child name")
		}
		childSet[child] = true
	}

	// Sort children without modifying the original slice
	children_sorted := make([]string, len(children))
	copy(children_sorted, children)
	sort.Strings(children_sorted)

	// Pre-allocate lookup map
	lookup := make(map[string][]string, len(children))
	
	// Process each child
	for i, childName := range children_sorted {
		plants := make([]string, 0, 4) // Pre-allocate with capacity 4 (2 rows * 2 plants)
		
		for _, row := range rows {
			startIdx := 2 * i
			if startIdx+1 >= len(row) {
				return nil, fmt.Errorf("invalid cup code")
			}
			
			plant1, ok1 := plantMap[row[startIdx:startIdx+1]]
			plant2, ok2 := plantMap[row[startIdx+1:startIdx+2]]
			
			if !ok1 || !ok2 {
				return nil, fmt.Errorf("invalid cup code")
			}
			
			plants = append(plants, plant1, plant2)
		}
		
		lookup[childName] = plants
	}

	return &Garden{lookup: lookup}, nil
}

// Method takes in name of child and returns the plants for that child as an array
// The boolean indicates whether the child was found in the garden
func (g *Garden) Plants(child string) ([]string, bool) {
	plants, ok := g.lookup[child]
	return plants, ok
}