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

	nodes := make(map[int]*Node, len(records))
	for _, record := range records {
		if record.ID < 0 || record.ID >= len(records) || (record.ID == 0 && record.Parent != 0) {
			return nil, errors.New("invalid record")
		}
		if _, exists := nodes[record.ID]; !exists {
			nodes[record.ID] = &Node{ID: record.ID}
		}
		if record.ID != 0 {
			if record.ID <= record.Parent {
				return nil, errors.New("invalid hierarchy")
			}
			parent, exists := nodes[record.Parent]
			if !exists {
				parent = &Node{ID: record.Parent}
				nodes[record.Parent] = parent
			}
			parent.Children = append(parent.Children, nodes[record.ID])
		}
	}

	for _, node := range nodes {
		sort.Slice(node.Children, func(i, j int) bool {
			return node.Children[i].ID < node.Children[j].ID
		})
	}

	root, exists := nodes[0]
	if !exists || len(nodes) != len(records) {
		return nil, errors.New("invalid tree structure")
	}

	return root, nil
}