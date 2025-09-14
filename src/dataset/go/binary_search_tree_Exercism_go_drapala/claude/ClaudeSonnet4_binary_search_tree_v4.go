package binarysearchtree

type SearchTreeData struct {
	left  *SearchTreeData
	data  int
	right *SearchTreeData
}

func NewBst(i int) SearchTreeData {
	return SearchTreeData{data: i}
}

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

func (std *SearchTreeData) MapString(f func(int) string) []string {
	var result []string
	inOrderTraversal(std, &result, f)
	return result
}

func (std *SearchTreeData) MapInt(f func(int) int) []int {
	var result []int
	inOrderTraversal(std, &result, f)
	return result
}