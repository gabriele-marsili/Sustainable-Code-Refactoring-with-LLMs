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

// ByID implements sort.Interface based on the ID field.
type ByID []*Node

func (c ByID) Len() int {
	return len(c)
}

func (c ByID) Swap(i, j int) {
	c[i], c[j] = c[j], c[i]
}

func (c ByID) Less(i, j int) bool {
	return c[i].ID < c[j].ID
}

func Build(records []Record) (*Node, error) {
	if len(records) == 0 {
		return nil, nil
	}

	// Sort records to simplify validation and tree building
	sort.Slice(records, func(i, j int) bool {
		return records[i].ID < records[j].ID
	})

	// Validate records
	if records[0].ID != 0 {
		return nil, errors.New("error no root node")
	}
	if records[0].Parent != 0 {
		return nil, errors.New("error root node has a parent")
	}

	nodes := make([]*Node, len(records))
	for i := range records {
		if nodes[records[i].ID] != nil {
			return nil, errors.New("error duplicate node")
		}
		if records[i].ID != 0 && records[i].ID == records[i].Parent {
			return nil, errors.New("error direct cycle")
		}
		if records[i].ID < records[i].Parent {
			return nil, errors.New("error child can not have id lower than parent")
		}
		nodes[records[i].ID] = &Node{ID: records[i].ID}
	}

	for i := 1; i < len(records); i++ {
		if nodes[i] == nil {
			return nil, errors.New("error non-continuous node")
		}
	}

	// Build tree
	for _, record := range records {
		if record.ID == 0 {
			continue
		}
		parent := nodes[record.Parent]
		child := nodes[record.ID]
		parent.Children = append(parent.Children, child)
	}

	// Sort children
	for _, node := range nodes {
		if node != nil {
			sort.Sort(ByID(node.Children))
		}
	}

	return nodes[0], nil
}