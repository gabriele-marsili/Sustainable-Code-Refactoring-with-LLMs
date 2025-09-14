package binarysearchtree

type SearchTreeData struct {
	data        int
	left, right *SearchTreeData
}

func Bst(data int) *SearchTreeData {
	return &SearchTreeData{data: data}
}

func (t *SearchTreeData) Insert(data int) {
	current := t
	for {
		if data <= current.data {
			if current.left == nil {
				current.left = &SearchTreeData{data: data}
				return
			}
			current = current.left
		} else {
			if current.right == nil {
				current.right = &SearchTreeData{data: data}
				return
			}
			current = current.right
		}
	}
}

func (t *SearchTreeData) MapString(stringFunc func(int) string) []string {
	if t == nil {
		return nil
	}
	
	size := t.countNodes()
	result := make([]string, 0, size)
	t.inorderTraversalString(&result, stringFunc)
	return result
}

func (t *SearchTreeData) MapInt(intFunc func(int) int) []int {
	if t == nil {
		return nil
	}
	
	size := t.countNodes()
	result := make([]int, 0, size)
	t.inorderTraversalInt(&result, intFunc)
	return result
}

func (t *SearchTreeData) countNodes() int {
	if t == nil {
		return 0
	}
	return 1 + t.left.countNodes() + t.right.countNodes()
}

func (t *SearchTreeData) inorderTraversalString(result *[]string, stringFunc func(int) string) {
	if t == nil {
		return
	}
	t.left.inorderTraversalString(result, stringFunc)
	*result = append(*result, stringFunc(t.data))
	t.right.inorderTraversalString(result, stringFunc)
}

func (t *SearchTreeData) inorderTraversalInt(result *[]int, intFunc func(int) int) {
	if t == nil {
		return
	}
	t.left.inorderTraversalInt(result, intFunc)
	*result = append(*result, intFunc(t.data))
	t.right.inorderTraversalInt(result, intFunc)
}