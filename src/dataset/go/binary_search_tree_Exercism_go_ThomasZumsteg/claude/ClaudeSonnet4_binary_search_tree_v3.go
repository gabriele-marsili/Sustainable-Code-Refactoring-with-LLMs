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

/*MapString converts the binary tree to an array
and applys a function to every element.*/
func (t *SearchTreeData) MapString(stringFunc func(int) string) []string {
	if t == nil {
		return []string{}
	}
	
	size := t.size()
	result := make([]string, 0, size)
	t.inorderString(&result, stringFunc)
	return result
}

/*MapInt converts a binary tree to an array
and applys a function to every element.*/
func (t *SearchTreeData) MapInt(intFunc func(int) int) []int {
	if t == nil {
		return []int{}
	}
	
	size := t.size()
	result := make([]int, 0, size)
	t.inorderInt(&result, intFunc)
	return result
}

func (t *SearchTreeData) size() int {
	if t == nil {
		return 0
	}
	return 1 + t.left.size() + t.right.size()
}

func (t *SearchTreeData) inorderInt(result *[]int, intFunc func(int) int) {
	if t == nil {
		return
	}
	t.left.inorderInt(result, intFunc)
	*result = append(*result, intFunc(t.data))
	t.right.inorderInt(result, intFunc)
}

func (t *SearchTreeData) inorderString(result *[]string, stringFunc func(int) string) {
	if t == nil {
		return
	}
	t.left.inorderString(result, stringFunc)
	*result = append(*result, stringFunc(t.data))
	t.right.inorderString(result, stringFunc)
}