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
	result := make([]string, 0)
	t.mapHelper(func(i int) {
		result = append(result, stringFunc(i))
	})
	return result
}

func (t *SearchTreeData) MapInt(intFunc func(int) int) []int {
	result := make([]int, 0)
	t.mapHelper(func(i int) {
		result = append(result, intFunc(i))
	})
	return result
}

func (t *SearchTreeData) mapHelper(visit func(int)) {
	if t == nil {
		return
	}
	if t.left != nil {
		t.left.mapHelper(visit)
	}
	visit(t.data)
	if t.right != nil {
		t.right.mapHelper(visit)
	}
}