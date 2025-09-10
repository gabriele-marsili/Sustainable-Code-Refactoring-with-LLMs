package pov

type Tree struct {
	value    string
	children []*Tree
	parent   *Tree
}

// New creates and returns a new Tree with the given root value and children.
func New(value string, children ...*Tree) *Tree {
	node := &Tree{
		value:    value,
		children: children,
	}
	for _, child := range children {
		child.parent = node
	}
	return node
}

// Value returns the value at the root of a tree.
func (tr *Tree) Value() string {
	return tr.value
}

// Children returns a slice containing the children of a tree.
func (tr *Tree) Children() []*Tree {
	return tr.children
}

// String describes a tree in a compact S-expression format.
func (tr *Tree) String() string {
	if tr == nil {
		return "nil"
	}
	if len(tr.children) == 0 {
		return tr.value
	}
	result := "(" + tr.value
	for _, ch := range tr.children {
		result += " " + ch.String()
	}
	return result + ")"
}

// FromPov returns the pov from the node specified in the argument.
func (tr *Tree) FromPov(from string) *Tree {
	fromTree := tr.findNode(from)
	if fromTree == nil {
		return nil
	}

	var prev *Tree
	curr := fromTree
	for curr != nil {
		next := curr.parent
		curr.parent = prev
		if prev != nil {
			prev.removeChild(curr)
			curr.addChild(prev)
		}
		prev = curr
		curr = next
	}
	return fromTree
}

// PathTo returns the shortest path between two nodes in the tree.
func (tr *Tree) PathTo(from, to string) []string {
	newPov := tr.FromPov(to)
	if newPov == nil {
		return nil
	}
	fromNode := newPov.findNode(from)
	if fromNode == nil {
		return nil
	}
	path := []string{}
	for curr := fromNode; curr != nil; curr = curr.parent {
		path = append(path, curr.value)
		if curr.value == to {
			break
		}
	}
	return reverseSlice(path)
}

func (tr *Tree) findNode(value string) *Tree {
	if tr.value == value {
		return tr
	}
	for _, child := range tr.children {
		if found := child.findNode(value); found != nil {
			return found
		}
	}
	return nil
}

func (tr *Tree) removeChild(child *Tree) {
	for i, ch := range tr.children {
		if ch == child {
			tr.children[i] = tr.children[len(tr.children)-1]
			tr.children = tr.children[:len(tr.children)-1]
			return
		}
	}
}

func (tr *Tree) addChild(child *Tree) {
	tr.children = append(tr.children, child)
}

func reverseSlice(slice []string) []string {
	for i, j := 0, len(slice)-1; i < j; i, j = i+1, j-1 {
		slice[i], slice[j] = slice[j], slice[i]
	}
	return slice
}