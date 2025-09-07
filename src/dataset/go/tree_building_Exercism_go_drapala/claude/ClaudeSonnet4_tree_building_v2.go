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
	
	// Find min and max IDs in a single pass
	minID, maxID := records[0].ID, records[0].ID
	idSet := make(map[int]bool, len(records))
	
	for _, record := range records {
		if record.ID < minID {
			minID = record.ID
		}
		if record.ID > maxID {
			maxID = record.ID
		}
		if idSet[record.ID] {
			return false // duplicate ID
		}
		idSet[record.ID] = true
	}
	
	// Check if we have exactly the right number of consecutive IDs
	expectedCount := maxID - minID + 1
	return len(records) == expectedCount && minID == 0
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
	// Check if child exists
	if childExists(OutputNode, record.ID) {
		return nil, fmt.Errorf("child already exists")
	}
	// If parent is higher than child, throw error
	if OutputNode.ID > record.ID {
		return nil, fmt.Errorf("parent is higher than child")
	}
	// If no errors, append to children
	ChildAddress := &Node{ID: record.ID}
	OutputNode.Children = append(OutputNode.Children, ChildAddress)
	return ChildAddress, nil
}

// Returns the memory address of the Parent node from the cache map
func findParentNode(AddressMap map[int]*Node, Parent int) (*Node, error) {
	ParentNode := AddressMap[Parent]
	if ParentNode == nil {
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
	OutputNode := Node{}

	// Create a map to contain memory addresses of nodes
	AddressMap := make(map[int]*Node, len(records))

	// Loop over records
	for i, record := range records {
		// This is the root node
		if record.Parent == 0 && record.ID == 0 {
			// Not first record, but is root
			if i != 0 {
				return nil, fmt.Errorf("duplicate root")
			}
			// Create the root node
			OutputNode.ID = record.ID
			// Add the root node to the address map
			AddressMap[record.ID] = &OutputNode
		} else {
			// Error handling - Parent = Root
			// Root node has parent
			if record.Parent != 0 && record.ID == 0 {
				return nil, fmt.Errorf("root node has a parent")
			}
			// First record, but not root
			if i == 0 {
				return nil, fmt.Errorf("first record is not root")
			}
			
			// Find parent node
			ParentNode := AddressMap[record.Parent]
			if ParentNode == nil {
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

	return &OutputNode, nil
}