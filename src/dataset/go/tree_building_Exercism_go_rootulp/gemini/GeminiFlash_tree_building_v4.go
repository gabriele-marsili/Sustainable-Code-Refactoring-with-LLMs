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
		return records[i].ID < records[j].ID
	})

	if records[0].ID != 0 {
		return nil, errors.New("error no root node")
	}

	nodes := make([]*Node, len(records))
	for i := range records {
		nodes[i] = &Node{ID: i}
	}

	for _, record := range records {
		if record.ID != 0 && record.ID == record.Parent {
			return nil, errors.New("error direct cycle")
		}
		if record.ID != 0 && record.ID < record.Parent {
			return nil, errors.New("error child can not have id lower than parent")
		}
		if record.ID == 0 && record.Parent != 0 {
			return nil, errors.New("error root node has a parent")
		}
		if record.ID >= len(records) {
			return nil, errors.New("error non-continuous node")
		}
	}

	for _, record := range records {
		if record.ID != 0 {
			parentID := record.Parent
			if parentID >= len(records) {
				return nil, errors.New("error non-continuous node")
			}
			nodes[parentID].Children = append(nodes[parentID].Children, nodes[record.ID])
		}
	}

	for _, node := range nodes {
		sort.Slice(node.Children, func(i, j int) bool {
			return node.Children[i].ID < node.Children[j].ID
		})
	}

	return nodes[0], nil
}