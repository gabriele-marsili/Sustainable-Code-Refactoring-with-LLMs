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

type ByID []*Node

func (c ByID) Len() int           { return len(c) }
func (c ByID) Swap(a, b int)      { c[a], c[b] = c[b], c[a] }
func (c ByID) Less(a, b int) bool { return c[a].ID < c[b].ID }

func Build(records []Record) (*Node, error) {
	if len(records) == 0 {
		return nil, nil
	}

	nodes := make(map[int]*Node, len(records))
	for _, record := range records {
		if record.ID == 0 && record.Parent != 0 {
			return nil, errors.New("error root node has a parent")
		}
		if record.ID < record.Parent {
			return nil, errors.New("error child can not have id lower than parent")
		}
		if record.ID == record.Parent && record.ID != 0 {
			return nil, errors.New("error direct cycle")
		}
		if _, exists := nodes[record.ID]; exists {
			return nil, errors.New("error duplicate node")
		}
		nodes[record.ID] = &Node{ID: record.ID}
	}

	if _, exists := nodes[0]; !exists {
		return nil, errors.New("error no root node")
	}

	for _, record := range records {
		if record.ID != 0 {
			parent, exists := nodes[record.Parent]
			if !exists {
				return nil, errors.New("error non-continuous node")
			}
			parent.Children = append(parent.Children, nodes[record.ID])
		}
	}

	for _, node := range nodes {
		sort.Sort(ByID(node.Children))
	}

	return nodes[0], nil
}