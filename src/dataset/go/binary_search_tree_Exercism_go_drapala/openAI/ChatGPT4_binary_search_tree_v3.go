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

func inOrderTraversal[T any](node *SearchTreeData, result *[]T, f func(int) T) {
	if node == nil {
		return
	}
	inOrderTraversal(node.left, result, f)
	*result = append(*result, f(node.data))
	inOrderTraversal(node.right, result, f)
}

// MapString returns the ordered contents of SearchTreeData as a []string.
func (std *SearchTreeData) MapString(f func(int) string) []string {
	result := make([]string, 0)
	inOrderTraversal(std, &result, f)
	return result
}

// MapInt returns the ordered contents of SearchTreeData as an []int.
func (std *SearchTreeData) MapInt(f func(int) int) []int {
	result := make([]int, 0)
	inOrderTraversal(std, &result, f)
	return result
}