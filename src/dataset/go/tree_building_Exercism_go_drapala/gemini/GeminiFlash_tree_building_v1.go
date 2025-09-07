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

// Only runs once during execution
func sortRecord(records []Record) {
	sort.Slice(records, func(i, j int) bool {
		if records[i].Parent != records[j].Parent {
			return records[i].Parent < records[j].Parent
		}
		return records[i].ID < records[j].ID
	})
}

// Only runs once during execution
func checkContinuousIDs(records []Record) bool {
	if len(records) == 0 {
		return true
	}

	sort.Slice(records, func(i, j int) bool {
		return records[i].ID < records[j].ID
	})

	for i := 1; i < len(records); i++ {
		if records[i].ID != records[i-1].ID+1 {
			return false
		}
	}
	return true
}

// Checks if child exists already in the node's children
func childExists(node *Node, ID int) bool {
	for _, child := range node.Children {
		if child.ID == ID {
			return true
		}
	}
	return false
}

// Appends a child node to the parent node
func appendToParent(OutputNode *Node, record Record) (*Node, error) {
	if OutputNode.ID > record.ID {
		return nil, fmt.Errorf("parent is higher than child")
	}

	if childExists(OutputNode, record.ID) {
		return nil, fmt.Errorf("child already exists")
	}

	ChildAddress := &Node{ID: record.ID}
	OutputNode.Children = append(OutputNode.Children, ChildAddress)
	return ChildAddress, nil
}

// Returns the memory address of the Parent node from the cache map
func findParentNode(AddressMap map[int]*Node, Parent int) (*Node, error) {
	ParentNode, ok := AddressMap[Parent]
	if !ok {
		return nil, fmt.Errorf("parent node not found")
	}
	return ParentNode, nil
}

// Builds a tree from a list of records
func Build(records []Record) (*Node, error) {
	// Edge case handling
	if len(records) == 0 {
		return nil, nil
	}

	// Sort the records
	sortRecord(records)

	// Check if IDs are continuous
	if !checkContinuousIDs(records) {
		return nil, fmt.Errorf("IDs are not continuous")
	}

	// Create the root node
	var OutputNode Node

	// Create a map to contain memory addresses of nodes
	AddressMap := make(map[int]*Node, len(records))

	// Check for multiple roots
	rootCount := 0
	for _, record := range records {
		if record.Parent == 0 && record.ID == 0 {
			rootCount++
		}
	}
	if rootCount > 1 {
		return nil, fmt.Errorf("duplicate root")
	}

	// Loop over records
	for i, record := range records {
		// This is the root node
		if record.Parent == 0 && record.ID == 0 {
			// Create the root node
			OutputNode.ID = record.ID
			// Add the root node to the address map
			AddressMap[record.ID] = &OutputNode
		} else {
			// Error handling - Parent = Root
			if record.Parent != 0 && record.ID == 0 {
				return nil, fmt.Errorf("root node has a parent")
			}
			// First record, but not root
			if i == 0 && record.ID != 0 {
				return nil, fmt.Errorf("first record is not root")
			}

			// Children that belong at root level
			if record.Parent == OutputNode.ID {
				ChildAddress, err := appendToParent(&OutputNode, record)
				if err != nil {
					return nil, err
				}
				AddressMap[record.ID] = ChildAddress
			} else {
				// Children lower than root
				ParentNode, err := findParentNode(AddressMap, record.Parent)
				if err != nil {
					return nil, fmt.Errorf("parent node doesn't exist")
				}
				// Parent found, append child to parent
				ChildAddress, err := appendToParent(ParentNode, record)
				if err != nil {
					return nil, err
				}
				// Add valid child address to cache map for next iteration
				AddressMap[record.ID] = ChildAddress
			}
		}
	}

	return &OutputNode, nil
}