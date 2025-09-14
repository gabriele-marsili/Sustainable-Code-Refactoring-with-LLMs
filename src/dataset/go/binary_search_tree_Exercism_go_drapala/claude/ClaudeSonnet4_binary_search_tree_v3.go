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

func inOrderStringAppend(node *SearchTreeData, result *[]string, f func(int) string) {
	if node == nil {
		return
	}
	inOrderStringAppend(node.left, result, f)
	*result = append(*result, f(node.data))
	inOrderStringAppend(node.right, result, f)
}

func inOrderIntAppend(node *SearchTreeData, result *[]int, f func(int) int) {
	if node == nil {
		return
	}
	inOrderIntAppend(node.left, result, f)
	*result = append(*result, f(node.data))
	inOrderIntAppend(node.right, result, f)
}

func (std *SearchTreeData) MapString(f func(int) string) []string {
	var result []string
	inOrderStringAppend(std, &result, f)
	return result
}

func (std *SearchTreeData) MapInt(f func(int) int) []int {
	var result []int
	inOrderIntAppend(std, &result, f)
	return result
}