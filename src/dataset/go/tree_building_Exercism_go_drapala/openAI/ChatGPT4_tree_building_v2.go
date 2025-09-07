package tree

import (
	"errors"
	"sort"
)

type Record struct {
	ID     int
	Parent int // 0 if root
}

type Node struct {
	ID       int
	Children []*Node
}

// Builds a tree from a list of records
func Build(records []Record) (*Node, error) {
	if len(records) == 0 {
		return nil, nil
	}

	// Sort records by ID
	sort.Slice(records, func(i, j int) bool {
		return records[i].ID < records[j].ID
	})

	// Check for invalid or non-continuous IDs
	if records[0].ID != 0 || records[0].Parent != 0 {
		return nil, errors.New("root node must have ID 0 and no parent")
	}
	for i := 1; i < len(records); i++ {
		if records[i].ID != i || records[i].Parent >= records[i].ID {
			return nil, errors.New("invalid or non-continuous IDs")
		}
	}

	nodes := make([]*Node, len(records))
	for i := range nodes {
		nodes[i] = &Node{ID: i}
	}

	for _, record := range records[1:] {
		parent := nodes[record.Parent]
		child := nodes[record.ID]
		parent.Children = append(parent.Children, child)
	}

	return nodes[0], nil
}