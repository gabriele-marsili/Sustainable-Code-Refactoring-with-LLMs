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
// There is no need to sort the elements in the result slice,
// they can be in any order.
func (tr *Tree) Children() []*Tree {
	return tr.children
}

// String describes a tree in a compact S-expression format.
// This helps to make test outputs more readable.
// Feel free to adapt this method as you see fit.
func (tr *Tree) String() string {
	if tr == nil {
		return "nil"
	}
	result := tr.Value()
	if len(tr.Children()) == 0 {
		return result
	}
	for _, ch := range tr.Children() {
		result += " " + ch.String()
	}
	return "(" + result + ")"
}

// POV problem-specific functions

// FromPov returns the pov from the node specified in the argument.
func (tr *Tree) FromPov(from string) *Tree {
	fromTree := tr.findNode(from)
	if fromTree == nil {
		return nil
	}

	if fromTree == tr {
		return fromTree
	}

	path := []*Tree{}
	current := fromTree
	for current != nil {
		path = append(path, current)
		current = current.parent
	}

	fromTree.parent = nil
	for i := 0; i < len(path)-1; i++ {
		flip(path[i], path[i+1])
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
	current := fromNode
	for current != nil {
		path = append(path, current.value)
		if current.value == to {
			return path
		}
		current = current.parent
	}
	return nil
}

func (tr *Tree) findNode(value string) *Tree {
	if tr == nil {
		return nil
	}
	if tr.value == value {
		return tr
	}

	for _, child := range tr.children {
		found := child.findNode(value)
		if found != nil {
			return found
		}
	}

	return nil
}

func flip(child *Tree, parent *Tree) {
	parent.parent = child
	removeChild(parent, child)
	addChild(child, parent)
}

func removeChild(parent *Tree, child *Tree) {
	children := parent.children
	for i, ch := range children {
		if ch == child {
			parent.children = append(children[:i], children[i+1:]...)
			return
		}
	}
}

func addChild(parent *Tree, child *Tree) {
	parent.children = append(parent.children, child)
}