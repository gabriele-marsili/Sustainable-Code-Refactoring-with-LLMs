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

func (c ByID) Swap(a int, b int) {
	c[a], c[b] = c[b], c[a]
}

func (c ByID) Less(a int, b int) bool {
	return c[a].ID < c[b].ID
}

func Build(records []Record) (*Node, error) {
	if len(records) == 0 {
		return nil, nil
	}

	// Pre-allocate slice for nodes, assuming IDs are mostly contiguous.
	nodes := make([]*Node, len(records))

	hasRoot := false
	for _, record := range records {
		if record.ID == 0 {
			hasRoot = true
			break
		}
	}
	if !hasRoot {
		return nil, errors.New("error no root node")
	}

	for _, record := range records {
		if record.ID == 0 && record.Parent != 0 {
			return nil, errors.New("error root node has a parent")
		}
		if record.ID == record.Parent && record.ID != 0 {
			return nil, errors.New("error direct cycle")
		}
		if record.ID < record.Parent {
			return nil, errors.New("error child can not have id lower than parent")
		}
		if record.ID >= len(records) {
			return nil, errors.New("error non-continuous node")
		}
		if nodes[record.ID] != nil {
			return nil, errors.New("error duplicate node")
		}
	}

	for i := range records {
		nodes[i] = &Node{ID: i}
	}

	for _, record := range records {
		if record.ID == 0 {
			continue
		}

		parentID := record.Parent
		childID := record.ID

		if parentID >= len(nodes) || childID >= len(nodes) {
			continue // Skip invalid records, error already handled
		}

		parent := nodes[parentID]
		child := nodes[childID]

		parent.Children = append(parent.Children, child)
	}

	for _, node := range nodes {
		sort.Sort(ByID(node.Children))
	}

	return nodes[0], nil
}