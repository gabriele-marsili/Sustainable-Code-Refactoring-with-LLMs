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
	intResults := t.MapInt(func(i int) int { return i })
	strings := make([]string, len(intResults))
	for i, val := range intResults {
		strings[i] = stringFunc(val)
	}
	return strings
}

// MapInt converts a binary tree to an array
// and applies a function to every element.
func (t *SearchTreeData) MapInt(intFunc func(int) int) []int {
	results := []int{}
	t.inOrderTraversal(func(val int) {
		results = append(results, intFunc(val))
	})
	return results
}

// inOrderTraversal performs an in-order traversal of the tree
// and applies the provided function to each node's data.
func (t *SearchTreeData) inOrderTraversal(visit func(int)) {
	if t == nil {
		return
	}
	if t.left != nil {
		t.left.inOrderTraversal(visit)
	}
	visit(t.data)
	if t.right != nil {
		t.right.inOrderTraversal(visit)
	}
}