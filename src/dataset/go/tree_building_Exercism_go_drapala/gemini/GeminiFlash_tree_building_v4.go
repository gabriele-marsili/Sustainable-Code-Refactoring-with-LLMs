package tree

import (
	"fmt"
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
		if records[i].Parent != records[j].Parent {
			return records[i].Parent < records[j].Parent
		}
		return records[i].ID < records[j].ID
	})

	if records[0].ID != 0 || records[0].Parent != 0 {
		return nil, fmt.Errorf("first record is not root")
	}

	for i := 1; i < len(records); i++ {
		if records[i].ID <= records[i-1].ID {
			return nil, fmt.Errorf("IDs are not continuous")
		}
		if records[i].ID != records[i-1].ID+1 {
			return nil, fmt.Errorf("IDs are not continuous")
		}
	}

	nodes := make(map[int]*Node, len(records))
	root := &Node{ID: 0}
	nodes[0] = root

	for _, record := range records {
		if record.ID == 0 && record.Parent != 0 {
			return nil, fmt.Errorf("root node has a parent")
		}

		if record.ID != 0 {
			parent, ok := nodes[record.Parent]
			if !ok {
				return nil, fmt.Errorf("parent node doesn't exist")
			}

			newNode := &Node{ID: record.ID}
			for _, child := range parent.Children {
				if child.ID == record.ID {
					return nil, fmt.Errorf("child already exists")
				}
			}
			if parent.ID > record.ID {
				return nil, fmt.Errorf("parent is higher than child")
			}

			parent.Children = append(parent.Children, newNode)
			nodes[record.ID] = newNode
		}
	}

	return root, nil
}