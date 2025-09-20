package tree

import (
	"errors"
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

// Optimized sorting function using Go's sort package
func sortRecord(records []Record) {
	sort.Slice(records, func(i, j int) bool {
		if records[i].Parent == records[j].Parent {
			return records[i].ID < records[j].ID
		}
		return records[i].Parent < records[j].Parent
	})
}

// Optimized continuous ID check
func checkContinuousIDs(records []Record) bool {
	for i, record := range records {
		if record.ID != i {
			return false
		}
	}
	return true
}

// Appends a child node to the parent node
func appendToParent(parent *Node, childID int) (*Node, error) {
	for _, child := range parent.Children {
		if child.ID == childID {
			return nil, errors.New("child already exists")
		}
	}
	if parent.ID > childID {
		return nil, errors.New("parent is higher than child")
	}
	childNode := &Node{ID: childID}
	parent.Children = append(parent.Children, childNode)
	return childNode, nil
}

// Builds a tree from a list of records
func Build(records []Record) (*Node, error) {
	if len(records) == 0 {
		return nil, nil
	}

	sortRecord(records)

	if !checkContinuousIDs(records) {
		return nil, errors.New("IDs are not continuous")
	}

	if records[0].ID != 0 || records[0].Parent != 0 {
		return nil, errors.New("first record is not root")
	}

	root := &Node{ID: 0}
	addressMap := map[int]*Node{0: root}

	for _, record := range records[1:] {
		parentNode, exists := addressMap[record.Parent]
		if !exists {
			return nil, errors.New("parent node doesn't exist")
		}
		childNode, err := appendToParent(parentNode, record.ID)
		if err != nil {
			return nil, err
		}
		addressMap[record.ID] = childNode
	}

	return root, nil
}