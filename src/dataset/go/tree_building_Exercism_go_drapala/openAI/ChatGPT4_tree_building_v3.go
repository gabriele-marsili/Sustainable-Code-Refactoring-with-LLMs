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

func sortRecord(records []Record) {
	sort.SliceStable(records, func(i, j int) bool {
		if records[i].Parent == records[j].Parent {
			return records[i].ID < records[j].ID
		}
		return records[i].Parent < records[j].Parent
	})
}

func checkContinuousIDs(records []Record) bool {
	for i := 0; i < len(records); i++ {
		if records[i].ID != i {
			return false
		}
	}
	return true
}

func appendToParent(OutputNode *Node, record Record) (*Node, error) {
	if OutputNode.ID > record.ID {
		return nil, fmt.Errorf("parent is higher than child")
	}
	ChildAddress := &Node{ID: record.ID}
	OutputNode.Children = append(OutputNode.Children, ChildAddress)
	return ChildAddress, nil
}

func findParentNode(AddressMap map[int]*Node, Parent int) (*Node, error) {
	if ParentNode, exists := AddressMap[Parent]; exists {
		return ParentNode, nil
	}
	return nil, fmt.Errorf("parent node not found")
}

func Build(records []Record) (*Node, error) {
	if len(records) == 0 {
		return nil, nil
	}

	sortRecord(records)

	if !checkContinuousIDs(records) {
		return nil, fmt.Errorf("IDs are not continuous")
	}

	root := &Node{}
	AddressMap := make(map[int]*Node)

	for i, record := range records {
		if record.ID == 0 {
			if i != 0 || record.Parent != 0 {
				return nil, fmt.Errorf("invalid root node")
			}
			root.ID = record.ID
			AddressMap[record.ID] = root
		} else {
			ParentNode, err := findParentNode(AddressMap, record.Parent)
			if err != nil {
				return nil, err
			}
			ChildAddress, err := appendToParent(ParentNode, record)
			if err != nil {
				return nil, err
			}
			AddressMap[record.ID] = ChildAddress
		}
	}

	return root, nil
}