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

func sortRecord(records []Record) {
	sort.Slice(records, func(i, j int) bool {
		if records[i].Parent != records[j].Parent {
			return records[i].Parent < records[j].Parent
		}
		return records[i].ID < records[j].ID
	})
}

func checkContinuousIDs(records []Record) bool {
	if len(records) == 0 {
		return true
	}
	
	minID, maxID := records[0].ID, records[0].ID
	for _, record := range records {
		if record.ID < minID {
			minID = record.ID
		}
		if record.ID > maxID {
			maxID = record.ID
		}
	}
	
	if maxID-minID+1 != len(records) {
		return false
	}
	
	seen := make([]bool, maxID-minID+1)
	for _, record := range records {
		seen[record.ID-minID] = true
	}
	
	for _, s := range seen {
		if !s {
			return false
		}
	}
	return true
}

func childExists(node *Node, ID int) bool {
	for _, child := range node.Children {
		if child.ID == ID {
			return true
		}
	}
	return false
}

func appendToParent(OutputNode *Node, record Record) (*Node, error) {
	if childExists(OutputNode, record.ID) {
		return nil, fmt.Errorf("child already exists")
	}
	
	if OutputNode.ID > record.ID {
		return nil, fmt.Errorf("parent is higher than child")
	}
	
	ChildAddress := &Node{ID: record.ID}
	OutputNode.Children = append(OutputNode.Children, ChildAddress)
	return ChildAddress, nil
}

func findParentNode(AddressMap map[int]*Node, Parent int) (*Node, error) {
	ParentNode := AddressMap[Parent]
	if ParentNode == nil {
		return nil, fmt.Errorf("parent node not found")
	}
	return ParentNode, nil
}

func Build(records []Record) (*Node, error) {
	if len(records) == 0 {
		return nil, nil
	}

	sortRecord(records)

	if !checkContinuousIDs(records) {
		return nil, fmt.Errorf("IDs are not continuous")
	}

	OutputNode := Node{}
	AddressMap := make(map[int]*Node, len(records))

	for i, record := range records {
		if record.Parent == 0 && record.ID == 0 {
			if i != 0 {
				return nil, fmt.Errorf("duplicate root")
			}
			OutputNode.ID = record.ID
			AddressMap[record.ID] = &OutputNode
		} else {
			if record.Parent != 0 && record.ID == 0 {
				return nil, fmt.Errorf("root node has a parent")
			}
			if i == 0 && record.ID != 0 {
				return nil, fmt.Errorf("first record is not root")
			}

			if record.Parent == OutputNode.ID {
				ChildAddress, err := appendToParent(&OutputNode, record)
				if err != nil {
					return nil, fmt.Errorf("child already exists")
				}
				AddressMap[record.ID] = ChildAddress
			} else {
				ParentNode, err := findParentNode(AddressMap, record.Parent)
				if err != nil {
					return nil, fmt.Errorf("parent node doesn't exist")
				}
				ChildAddress, err := appendToParent(ParentNode, record)
				if err != nil {
					return nil, fmt.Errorf("child already exists")
				}
				AddressMap[record.ID] = ChildAddress
			}
		}
	}

	return &OutputNode, nil
}