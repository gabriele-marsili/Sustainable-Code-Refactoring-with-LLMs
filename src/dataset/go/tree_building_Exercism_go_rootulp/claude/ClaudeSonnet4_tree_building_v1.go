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

	// Build tree structure
	nodes := make(map[int]*Node, len(records))
	childrenMap := make(map[int][]*Node)

	// Create all nodes first
	for _, record := range records {
		nodes[record.ID] = &Node{ID: record.ID}
	}

	// Build parent-child relationships
	for _, record := range records {
		if record.ID != 0 {
			childrenMap[record.Parent] = append(childrenMap[record.Parent], nodes[record.ID])
		}
	}

	// Sort children once per parent
	for parentID, children := range childrenMap {
		sort.Slice(children, func(i, j int) bool {
			return children[i].ID < children[j].ID
		})
		nodes[parentID].Children = children
	}

	return nodes[0], nil
}