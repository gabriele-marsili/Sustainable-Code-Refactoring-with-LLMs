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

func inOrderStringAppend(Node *SearchTreeData, result *[]string, f func(int) string) {
	if Node == nil {
		return
	}
	inOrderStringAppend(Node.left, result, f)
	*result = append(*result, f(Node.data))
	inOrderStringAppend(Node.right, result, f)
}

func inOrderIntAppend(Node *SearchTreeData, result *[]int, f func(int) int) {
	if Node == nil {
		return
	}
	inOrderIntAppend(Node.left, result, f)
	*result = append(*result, f(Node.data))
	inOrderIntAppend(Node.right, result, f)
}

// MapString returns the ordered contents of SearchTreeData as a []string.
// The values are in increasing order starting with the lowest int value.
// SearchTreeData that has the numbers [1,3,7,5] added will return the
// []string ["1", "3", "5", "7"].
func (std *SearchTreeData) MapString(f func(int) string) []string {
	var result []string
	inOrderStringAppend(std, &result, f)
	return result
}

// MapInt returns the ordered contents of SearchTreeData as an []int.
// The values are in increasing order starting with the lowest int value.
// SearchTreeData that has the numbers [1,3,7,5] added will return the
// []int [1,3,5,7].
func (std *SearchTreeData) MapInt(f func(int) int) []int {
	var result []int
	inOrderIntAppend(std, &result, f)
	return result
}