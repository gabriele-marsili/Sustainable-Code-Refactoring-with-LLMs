package binarysearchtree

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
	node := std
	for {
		if i <= node.data {
			if node.left == nil {
				node.left = &SearchTreeData{data: i}
				return
			}
			node = node.left
		} else {
			if node.right == nil {
				node.right = &SearchTreeData{data: i}
				return
			}
			node = node.right
		}
	}
}

func inOrderTraversal(node *SearchTreeData, result []int, f func(int) int, index *int) {
	if node != nil {
		inOrderTraversal(node.left, result, f, index)
		result[*index] = f(node.data)
		*index++
		inOrderTraversal(node.right, result, f, index)
	}
}

func inOrderTraversalString(node *SearchTreeData, result []string, f func(int) string, index *int) {
	if node != nil {
		inOrderTraversalString(node.left, result, f, index)
		result[*index] = f(node.data)
		*index++
		inOrderTraversalString(node.right, result, f, index)
	}
}

func (std *SearchTreeData) size() int {
	if std == nil {
		return 0
	}
	return 1 + std.left.size() + std.right.size()
}

// MapString returns the ordered contents of SearchTreeData as a []string.
// The values are in increasing order starting with the lowest int value.
// SearchTreeData that has the numbers [1,3,7,5] added will return the
// []string ["1", "3", "5", "7"].
func (std *SearchTreeData) MapString(f func(int) string) []string {
	size := std.size()
	result := make([]string, size)
	index := 0
	inOrderTraversalString(std, result, f, &index)
	return result
}

// MapInt returns the ordered contents of SearchTreeData as an []int.
// The values are in increasing order starting with the lowest int value.
// SearchTreeData that has the numbers [1,3,7,5] added will return the
// []int [1,3,5,7].
func (std *SearchTreeData) MapInt(f func(int) int) []int {
	size := std.size()
	result := make([]int, size)
	index := 0
	inOrderTraversal(std, result, f, &index)
	return result
}