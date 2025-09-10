package binarysearchtree

type SearchTreeData struct {
	data        int
	left, right *SearchTreeData
}

func Bst(data int) *SearchTreeData {
	return &SearchTreeData{data: data}
}

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

func (t *SearchTreeData) MapString(stringFunc func(int) string) []string {
	intResults := t.MapInt(nil)
	strings := make([]string, len(intResults))
	for i, val := range intResults {
		strings[i] = stringFunc(val)
	}
	return strings
}

func (t *SearchTreeData) MapInt(intFunc func(int) int) []int {
	results := make([]int, 0)
	var traverse func(node *SearchTreeData)
	traverse = func(node *SearchTreeData) {
		if node == nil {
			return
		}
		traverse(node.left)
		if intFunc != nil {
			results = append(results, intFunc(node.data))
		} else {
			results = append(results, node.data)
		}
		traverse(node.right)
	}
	traverse(t)
	return results
}