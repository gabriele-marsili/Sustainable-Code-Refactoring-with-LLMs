package binarysearchtree

//SearchTreeData is a binary tree data structure
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
	t.inOrderString(stringFunc, &result)
	return result
}

func (t *SearchTreeData) inOrderString(stringFunc func(int) string, result *[]string) {
	if t == nil {
		return
	}
	t.left.inOrderString(stringFunc, result)
	*result = append(*result, stringFunc(t.data))
	t.right.inOrderString(stringFunc, result)
}

/*MapInt converts a binary tree to an array
and applys a function to every element.*/
func (t *SearchTreeData) MapInt(intFunc func(int) int) []int {
	result := make([]int, 0)
	t.inOrderInt(intFunc, &result)
	return result
}

func (t *SearchTreeData) inOrderInt(intFunc func(int) int, result *[]int) {
	if t == nil {
		return
	}
	t.left.inOrderInt(intFunc, result)
	*result = append(*result, intFunc(t.data))
	t.right.inOrderInt(intFunc, result)
}