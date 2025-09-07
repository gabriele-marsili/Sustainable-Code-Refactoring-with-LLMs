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

	// Find the root and max ID while validating.  Also pre-allocate the nodes slice.
	var rootFound bool
	maxID := -1
	for _, record := range records {
		if record.ID == 0 {
			rootFound = true
			if record.Parent != 0 {
				return nil, errors.New("error root node has a parent")
			}
		}
		if record.ID > maxID {
			maxID = record.ID
		}
		if record.ID == record.Parent && record.ID != 0 {
			return nil, errors.New("error direct cycle")
		}
		if record.ID < record.Parent {
			return nil, errors.New("error child can not have id lower than parent")
		}
	}

	if !rootFound {
		return nil, errors.New("error no root node")
	}

	nodes := make([]*Node, maxID+1) // Pre-allocate and size correctly.

	// Check for duplicates and non-continuous IDs.
	seen := make([]bool, maxID+1)
	for _, record := range records {
		if record.ID > len(records)-1 {
			return nil, errors.New("error non-continuous node")
		}
		if seen[record.ID] {
			return nil, errors.New("error duplicate node")
		}
		seen[record.ID] = true
	}

	// Initialize root node.
	nodes[0] = &Node{ID: 0}

	// Build the tree.
	for _, record := range records {
		if nodes[record.ID] == nil {
			nodes[record.ID] = &Node{ID: record.ID}
		}
		if record.ID == 0 {
			continue
		}

		parentID := record.Parent
		if nodes[parentID] == nil {
			nodes[parentID] = &Node{ID: parentID}
		}

		parent := nodes[parentID]
		child := nodes[record.ID]

		parent.Children = append(parent.Children, child)
	}

	// Sort children of each node.
	for _, node := range nodes {
		if node != nil {
			sort.Slice(node.Children, func(i, j int) bool {
				return node.Children[i].ID < node.Children[j].ID
			})
		}
	}

	return nodes[0], nil
}