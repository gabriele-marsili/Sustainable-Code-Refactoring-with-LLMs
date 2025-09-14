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
	current := std
	for {
		if i <= current.data {
			if current.left == nil {
				current.left = &SearchTreeData{data: i}
				return
			}
			current = current.left
		} else {
			if current.right == nil {
				current.right = &SearchTreeData{data: i}
				return
			}
			current = current.right
		}
	}
}

// MapString returns the ordered contents of SearchTreeData as a []string.
// The values are in increasing order starting with the lowest int value.
// SearchTreeData that has the numbers [1,3,7,5] added will return the
// []string ["1", "3", "5", "7"].
func (std *SearchTreeData) MapString(func(int) string) (result []string) {
	size := std.countNodes()
	result = make([]string, 0, size)
	std.inOrderTraversalString(&result)
	return result
}

// MapInt returns the ordered contents of SearchTreeData as an []int.
// The values are in increasing order starting with the lowest int value.
// SearchTreeData that has the numbers [1,3,7,5] added will return the
// []int [1,3,5,7].
func (std *SearchTreeData) MapInt(func(int) int) (result []int) {
	size := std.countNodes()
	result = make([]int, 0, size)
	std.inOrderTraversalInt(&result)
	return result
}

func (std *SearchTreeData) countNodes() int {
	if std == nil {
		return 0
	}
	return 1 + std.left.countNodes() + std.right.countNodes()
}

func (std *SearchTreeData) inOrderTraversalString(result *[]string) {
	if std == nil {
		return
	}
	std.left.inOrderTraversalString(result)
	*result = append(*result, strconv.Itoa(std.data))
	std.right.inOrderTraversalString(result)
}

func (std *SearchTreeData) inOrderTraversalInt(result *[]int) {
	if std == nil {
		return
	}
	std.left.inOrderTraversalInt(result)
	*result = append(*result, std.data)
	std.right.inOrderTraversalInt(result)
}

func visitInt(std *SearchTreeData) (result []int) {
	if std == nil {
		return []int{}
	}
	size := std.countNodes()
	result = make([]int, 0, size)
	std.inOrderTraversalInt(&result)
	return result
}