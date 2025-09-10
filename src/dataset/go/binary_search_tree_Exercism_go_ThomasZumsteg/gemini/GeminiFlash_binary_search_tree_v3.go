package binarysearchtree

// SearchTreeData is a binary tree data structure
type SearchTreeData struct {
	data        int
	left, right *SearchTreeData
}

/*Bst creates a new binary search tree.*/
func Bst(data int) *SearchTreeData {
	return &SearchTreeData{data: data}
}

/*Insert adds a node to the binary tree.*/
func (t *SearchTreeData) Insert(data int) {
	if data < t.data {
		if t.left == nil {
			t.left = Bst(data)
		} else {
			t.left.Insert(data)
		}
	} else {
		if t.right == nil {
			t.right = Bst(data)
		} else {
			t.right.Insert(data)
		}
	}
}

/*MapString converts the binary tree to an array
and applys a function to every element.*/
func (t *SearchTreeData) MapString(stringFunc func(int) string) []string {
	result := make([]string, 0)
	t.inOrderTraversalString(&result, stringFunc)
	return result
}

func (t *SearchTreeData) inOrderTraversalString(result *[]string, stringFunc func(int) string) {
	if t == nil {
		return
	}
	t.left.inOrderTraversalString(result, stringFunc)
	*result = append(*result, stringFunc(t.data))
	t.right.inOrderTraversalString(result, stringFunc)
}

/*MapInt converts a binary tree to an array
and applys a function to every element.*/
func (t *SearchTreeData) MapInt(intFunc func(int) int) []int {
	result := make([]int, 0)
	t.inOrderTraversalInt(&result, intFunc)
	return result
}

func (t *SearchTreeData) inOrderTraversalInt(result *[]int, intFunc func(int) int) {
	if t == nil {
		return
	}
	t.left.inOrderTraversalInt(result, intFunc)
	*result = append(*result, intFunc(t.data))
	t.right.inOrderTraversalInt(result, intFunc)
}