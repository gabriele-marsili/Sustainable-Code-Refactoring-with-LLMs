package tree

import (
	"fmt"
	"reflect"
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

	// Assuming records are already sorted by ID after sortRecord
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
	// If parent is higher than child, throw error
	if OutputNode.ID > record.ID {
		return nil, fmt.Errorf("parent is higher than child")
	}

	// Check if child exists
	for _, child := range OutputNode.Children {
		if child.ID == record.ID {
			return nil, fmt.Errorf("child already exists")
		}
	}

	// If no errors, append to children
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
	if reflect.DeepEqual(records, []Record{}) {
		return nil, nil
	}

	// Sort the records
	sortRecord(records)

	// Check if IDs are continuous
	if len(records) > 0 && records[0].ID != 0 {
		return nil, fmt.Errorf("first record is not root")
	}

	if !checkContinuousIDs(records) {
		return nil, fmt.Errorf("IDs are not continuous")
	}

	// Create the root node
	OutputNode := Node{}

	// Create a slice to contain memory addresses of nodes
	AddressMap := make(map[int]*Node)

	// Initialize root node if it exists
	if len(records) > 0 && records[0].ID == 0 && records[0].Parent == 0 {
		OutputNode.ID = records[0].ID
		AddressMap[0] = &OutputNode
	}

	// Loop over records
	for i := 0; i < len(records); i++ {
		record := records[i]

		// This is the root node
		if record.Parent == 0 && record.ID == 0 {
			// Not first record, but is root
			if i != 0 {
				return nil, fmt.Errorf("duplicate root")
			}
			continue // Root already handled
		}

		// #######################################
		// Error handling - Parent = Root
		// #######################################
		// Root node has parent
		if record.Parent != 0 && record.ID == 0 {
			return nil, fmt.Errorf("root node has a parent")
		}

		// #######################################
		// Children that belong at root level
		// #######################################
		if record.Parent == OutputNode.ID {
			ChildAddress, err := appendToParent(&OutputNode, record)
			if err != nil {
				return nil, err
			}
			AddressMap[record.ID] = ChildAddress
		} else {
			// #######################################
			// Children lower than root
			// #######################################
			ParentNode, err := findParentNode(AddressMap, record.Parent)
			if err != nil {
				return nil, err
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

	return &OutputNode, nil
}