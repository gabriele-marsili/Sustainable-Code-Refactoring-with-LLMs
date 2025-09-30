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
	if t.data < data {
		if t.right == nil {
			t.right = &SearchTreeData{data: data}
		} else {
			t.right.Insert(data)
		}
	} else {
		if t.left == nil {
			t.left = &SearchTreeData{data: data}
		} else {
			t.left.Insert(data)
		}
	}
}

/*MapString converts the binary tree to an array
and applys a function to every element.*/
func (t *SearchTreeData) MapString(stringFunc func(int) string) []string {
	if t == nil {
		return []string{}
	}
	
	result := make([]string, 0, t.size())
	t.inorderString(&result, stringFunc)
	return result
}

/*MapInt converts a binary tree to an array
and applys a function to every element.*/
func (t *SearchTreeData) MapInt(intFunc func(int) int) []int {
	if t == nil {
		return []int{}
	}
	
	result := make([]int, 0, t.size())
	t.inorderInt(&result, intFunc)
	return result
}

func (t *SearchTreeData) size() int {
	if t == nil {
		return 0
	}
	return 1 + t.left.size() + t.right.size()
}

func (t *SearchTreeData) inorderString(result *[]string, stringFunc func(int) string) {
	if t == nil {
		return
	}
	t.left.inorderString(result, stringFunc)
	*result = append(*result, stringFunc(t.data))
	t.right.inorderString(result, stringFunc)
}

func (t *SearchTreeData) inorderInt(result *[]int, intFunc func(int) int) {
	if t == nil {
		return
	}
	t.left.inorderInt(result, intFunc)
	*result = append(*result, intFunc(t.data))
	t.right.inorderInt(result, intFunc)
}