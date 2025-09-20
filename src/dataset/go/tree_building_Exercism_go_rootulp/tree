package tree

import (
	"errors"
)

// Define a function Build(records []Record) (*Node, error)
// where Record is a struct containing int fields ID and Parent
// and Node is a struct containing int field ID and []*Node field Children.

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

	nodes := make([]*Node, len(records))
	for _, record := range records {
		if record.ID < 0 || record.ID >= len(records) {
			return nil, errors.New("error non-continuous node")
		}
		if record.ID == 0 && record.Parent != 0 {
			return nil, errors.New("error root node has a parent")
		}
		if record.ID != 0 && record.ID <= record.Parent {
			return nil, errors.New("error child cannot have ID lower than or equal to parent")
		}
		if nodes[record.ID] != nil {
			return nil, errors.New("error duplicate node")
		}
		nodes[record.ID] = &Node{ID: record.ID}
	}

	if nodes[0] == nil {
		return nil, errors.New("error no root node")
	}

	for _, record := range records {
		if record.ID == 0 {
			continue
		}
		parent := nodes[record.Parent]
		if parent == nil {
			return nil, errors.New("error non-continuous node")
		}
		parent.Children = append(parent.Children, nodes[record.ID])
	}

	return nodes[0], nil
}