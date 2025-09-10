package binarysearchtree

import "strconv"

type SearchTreeData struct {
	left  *SearchTreeData
	data  int
	right *SearchTreeData
}

// NewBst creates and returns a new SearchTreeData.
func NewBst(i int) SearchTreeData {
	return SearchTreeData{data: i}
}

// Insert inserts an int into the SearchTreeData.
// Inserts happen based on the rules of a BinarySearchTree
func (std *SearchTreeData) Insert(i int) {
	if i <= std.data {
		if std.left == nil {
			std.left = &SearchTreeData{data: i}
		} else {
			std.left.Insert(i)
		}
	} else {
		if std.right == nil {
			std.right = &SearchTreeData{data: i}
		} else {
			std.right.Insert(i)
		}
	}
}

// MapString returns the ordered contents of SearchTreeData as a []string.
// The values are in increasing order starting with the lowest int value.
func (std *SearchTreeData) MapString(f func(int) string) []string {
	result := make([]string, 0)
	std.inOrderTraversal(func(val int) {
		result = append(result, f(val))
	})
	return result
}

// MapInt returns the ordered contents of SearchTreeData as an []int.
// The values are in increasing order starting with the lowest int value.
func (std *SearchTreeData) MapInt(f func(int) int) []int {
	result := make([]int, 0)
	std.inOrderTraversal(func(val int) {
		result = append(result, f(val))
	})
	return result
}

// inOrderTraversal performs an in-order traversal and applies a function to each node's data.
func (std *SearchTreeData) inOrderTraversal(visit func(int)) {
	if std == nil {
		return
	}
	if std.left != nil {
		std.left.inOrderTraversal(visit)
	}
	visit(std.data)
	if std.right != nil {
		std.right.inOrderTraversal(visit)
	}
}