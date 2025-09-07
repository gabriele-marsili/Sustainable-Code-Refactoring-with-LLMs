package tree

import (
	"errors"
	"sort"
)

type Record struct {
	ID     int
	Parent int
}

type Node struct {
	ID       int
	Children []*Node
}

func Build(records []Record) (*Node, error) {
	if len(records) == 0 {
		return nil, nil
	}

	// Single pass validation and data collection
	seen := make(map[int]bool, len(records))
	hasRoot := false
	maxID := -1

	for _, record := range records {
		// Check for duplicates
		if seen[record.ID] {
			return &Node{}, errors.New("error duplicate node")
		}
		seen[record.ID] = true

		// Check for root node
		if record.ID == 0 {
			hasRoot = true
			if record.Parent != 0 {
				return &Node{}, errors.New("error root node has a parent")
			}
		} else {
			// Check for direct cycle
			if record.ID == record.Parent {
				return &Node{}, errors.New("error direct cycle")
			}
			// Check child lower than parent
			if record.ID < record.Parent {
				return &Node{}, errors.New("error child can not have id lower than parent")
			}
		}

		if record.ID > maxID {
			maxID = record.ID
		}
	}

	// Check for no root node
	if !hasRoot {
		return &Node{}, errors.New("error no root node")
	}

	// Check for non-continuous
	if maxID >= len(records) {
		return &Node{}, errors.New("error non-continuous node")
	}

	// Pre-allocate nodes slice for better memory efficiency
	nodes := make([]*Node, maxID+1)
	for i := 0; i <= maxID; i++ {
		nodes[i] = &Node{ID: i}
	}

	// Group children by parent for batch processing
	childrenMap := make(map[int][]int)
	for _, record := range records {
		if record.ID != 0 {
			childrenMap[record.Parent] = append(childrenMap[record.Parent], record.ID)
		}
	}

	// Assign children in batches and sort once per parent
	for parentID, childIDs := range childrenMap {
		sort.Ints(childIDs)
		children := make([]*Node, len(childIDs))
		for i, childID := range childIDs {
			children[i] = nodes[childID]
		}
		nodes[parentID].Children = children
	}

	return nodes[0], nil
}