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
	var strings []string
	t.MapIntHelper(func(i int) int { return i }, &strings, stringFunc)
	return strings
}

/*MapInt converts a binary tree to an array
and applys a function to every element.*/
func (t *SearchTreeData) MapInt(intFunc func(int) int) []int {
	var ints []int
	t.MapIntHelper(intFunc, &ints, nil)
	return ints
}

func (t *SearchTreeData) MapIntHelper(intFunc func(int) int, ints *[]int, stringFunc func(int) string) {
	if t == nil {
		return
	}

	t.left.MapIntHelper(intFunc, ints, stringFunc)

	if ints != nil {
		*ints = append(*ints, intFunc(t.data))
	} else if stringFunc != nil {
		*ints = append(*ints, stringFunc(t.data)) // Reuse ints slice for strings
	}

	t.right.MapIntHelper(intFunc, ints, stringFunc)
}