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
// SearchTreeData that has the numbers [1,3,7,5] added will return the
// []string ["1", "3", "5", "7"].
func (std *SearchTreeData) MapString(func(int) string) (result []string) {
	visitString(std, &result)
	return result
}

// MapInt returns the ordered contents of SearchTreeData as an []int.
// The values are in increasing order starting with the lowest int value.
// SearchTreeData that has the numbers [1,3,7,5] added will return the
// []int [1,3,5,7].
func (std *SearchTreeData) MapInt(func(int) int) (result []int) {
	visitInt(std, &result)
	return result
}

func visitInt(std *SearchTreeData, result *[]int) {
	if std == nil {
		return
	}
	visitInt(std.left, result)
	*result = append(*result, std.data)
	visitInt(std.right, result)
}

func visitString(std *SearchTreeData, result *[]string) {
	if std == nil {
		return
	}
	visitString(std.left, result)
	*result = append(*result, strconv.Itoa(std.data))
	visitString(std.right, result)
}