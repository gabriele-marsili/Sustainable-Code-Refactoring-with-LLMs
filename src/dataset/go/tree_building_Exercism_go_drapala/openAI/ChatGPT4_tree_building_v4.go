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

	sort.Slice(records, func(i, j int) bool {
		if records[i].ID != records[j].ID {
			return records[i].ID < records[j].ID
		}
		return records[i].Parent < records[j].Parent
	})

	if records[0].ID != 0 || records[0].Parent != 0 {
		return nil, errors.New("no valid root node")
	}

	nodes := make(map[int]*Node, len(records))
	nodes[0] = &Node{ID: 0}

	for i, record := range records {
		if record.ID != i {
			return nil, errors.New("non-continuous IDs")
		}
		if record.ID == 0 {
			continue
		}

		parent, exists := nodes[record.Parent]
		if !exists {
			return nil, errors.New("parent node not found")
		}

		node := &Node{ID: record.ID}
		parent.Children = append(parent.Children, node)
		nodes[record.ID] = node
	}

	return nodes[0], nil
}