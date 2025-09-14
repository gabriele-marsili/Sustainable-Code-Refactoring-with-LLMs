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

var plantMap = map[byte]string{
	'V': "violets",
	'R': "radishes",
	'C': "clover",
	'G': "grass",
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
	rows := strings.Split(diagram[1:], "\n") // Skip first newline directly
	
	if len(rows) != 2 {
		return nil, fmt.Errorf("rows are badly formatted")
	}
	
	row1, row2 := rows[0], rows[1]
	if len(row1) != len(row2) || len(row1)%2 != 0 {
		return nil, fmt.Errorf("rows are badly formatted")
	}

	// Check for duplicate children and invalid names upfront
	childSet := make(map[string]bool, len(children))
	for _, child := range children {
		if childSet[child] {
			return nil, fmt.Errorf("duplicated child name")
		}
		childSet[child] = true
	}

	// Sort children without modifying the original slice
	childrenSorted := make([]string, len(children))
	copy(childrenSorted, children)
	sort.Strings(childrenSorted)

	// Pre-allocate garden lookup with known capacity
	g := Garden{
		lookup: make(map[string][]string, len(children)),
	}

	// Process each child
	for i, childName := range childrenSorted {
		startIdx := i * 2
		if startIdx+1 >= len(row1) {
			break
		}

		// Get plant codes directly as bytes
		plant1Code := row1[startIdx]
		plant2Code := row1[startIdx+1]
		plant3Code := row2[startIdx]
		plant4Code := row2[startIdx+1]

		// Validate plant codes
		plant1, ok1 := plantMap[plant1Code]
		plant2, ok2 := plantMap[plant2Code]
		plant3, ok3 := plantMap[plant3Code]
		plant4, ok4 := plantMap[plant4Code]

		if !ok1 || !ok2 || !ok3 || !ok4 {
			return nil, fmt.Errorf("invalid cup code")
		}

		// Pre-allocate plants slice with exact capacity
		plants := make([]string, 0, 4)
		plants = append(plants, plant1, plant2, plant3, plant4)
		
		g.lookup[childName] = plants
	}

	return &g, nil
}

// Method takes in name of child and returns the plants for that child as an array
// The boolean indicates whether the child was found in the garden
func (g *Garden) Plants(child string) ([]string, bool) {
	plants, ok := g.lookup[child]
	return plants, ok
}