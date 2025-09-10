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
	if t == nil {
		return []string{}
	}
	var strings []string
	t.inOrderTraversalString(stringFunc, &strings)
	return strings
}

func (t *SearchTreeData) inOrderTraversalString(stringFunc func(int) string, strings *[]string) {
	if t == nil {
		return
	}
	t.left.inOrderTraversalString(stringFunc, strings)
	*strings = append(*strings, stringFunc(t.data))
	t.right.inOrderTraversalString(stringFunc, strings)
}

/*MapInt converts a binary tree to an array
and applys a function to every element.*/
func (t *SearchTreeData) MapInt(intFunc func(int) int) []int {
	if t == nil {
		return []int{}
	}
	var ints []int
	t.inOrderTraversalInt(intFunc, &ints)
	return ints
}

func (t *SearchTreeData) inOrderTraversalInt(intFunc func(int) int, ints *[]int) {
	if t == nil {
		return
	}
	t.left.inOrderTraversalInt(intFunc, ints)
	*ints = append(*ints, intFunc(t.data))
	t.right.inOrderTraversalInt(intFunc, ints)
}