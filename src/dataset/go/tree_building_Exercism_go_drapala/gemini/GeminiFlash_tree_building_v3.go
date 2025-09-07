package tree

import (
	"fmt"
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

func Build(records []Record) (*Node, error) {
	if len(records) == 0 {
		return nil, nil
	}

	sort.Slice(records, func(i, j int) bool {
		if records[i].Parent != records[j].Parent {
			return records[i].Parent < records[j].Parent
		}
		return records[i].ID < records[j].ID
	})

	if records[0].ID != 0 || records[0].Parent != 0 {
		return nil, fmt.Errorf("first record is not root")
	}

	for i := 1; i < len(records); i++ {
		if records[i].ID == 0 && records[i].Parent != 0 {
			return nil, fmt.Errorf("root node has a parent")
		}
		if records[i].ID <= records[i].Parent && records[i].ID != 0 {
			return nil, fmt.Errorf("child ID is less than or equal to parent ID")
		}
		if i > 0 && records[i].ID != records[i-1].ID+1 {
			return nil, fmt.Errorf("IDs are not continuous")
		}
	}

	nodes := make(map[int]*Node, len(records))
	root := &Node{ID: records[0].ID}
	nodes[root.ID] = root

	for i := 1; i < len(records); i++ {
		record := records[i]
		parent, ok := nodes[record.Parent]
		if !ok {
			return nil, fmt.Errorf("parent node doesn't exist")
		}

		child := &Node{ID: record.ID}
		nodes[child.ID] = child
		parent.Children = append(parent.Children, child)
	}

	return root, nil
}