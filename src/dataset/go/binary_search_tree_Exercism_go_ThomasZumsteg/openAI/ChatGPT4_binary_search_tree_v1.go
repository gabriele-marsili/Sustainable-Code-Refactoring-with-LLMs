package binarysearchtree

// SearchTreeData is a binary tree data structure
type SearchTreeData struct {
	data        int
	left, right *SearchTreeData
}

// Bst creates a new binary search tree.
func Bst(data int) *SearchTreeData {
	return &SearchTreeData{data: data}
}

// Insert adds a node to the binary tree.
func (t *SearchTreeData) Insert(data int) {
	if t.data < data {
		if t.right == nil {
			t.right = Bst(data)
		} else {
			t.right.Insert(data)
		}
	} else {
		if t.left == nil {
			t.left = Bst(data)
		} else {
			t.left.Insert(data)
		}
	}
}

// MapString converts the binary tree to an array
// and applies a function to every element.
func (t *SearchTreeData) MapString(stringFunc func(int) string) []string {
	ints := t.MapInt(func(i int) int { return i })
	strings := make([]string, len(ints))
	for i, v := range ints {
		strings[i] = stringFunc(v)
	}
	return strings
}

// MapInt converts a binary tree to an array
// and applies a function to every element.
func (t *SearchTreeData) MapInt(intFunc func(int) int) []int {
	if t == nil {
		return nil
	}
	left := t.left.MapInt(intFunc)
	right := t.right.MapInt(intFunc)
	result := make([]int, 0, len(left)+1+len(right))
	result = append(result, left...)
	result = append(result, intFunc(t.data))
	result = append(result, right...)
	return result
}