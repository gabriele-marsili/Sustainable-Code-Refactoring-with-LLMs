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
	result := tr.value
	if len(tr.children) == 0 {
		return result
	}
	childStrings := make([]string, len(tr.children))
	for i, ch := range tr.children {
		childStrings[i] = ch.String()
	}
	return "(" + result + " " + joinStrings(childStrings, " ") + ")"
}

// POV problem-specific functions

// FromPov returns the pov from the node specified in the argument.
func (tr *Tree) FromPov(from string) *Tree {
	fromTree := tr.findNode(from)
	if fromTree == nil {
		return nil
	}

	var prev *Tree
	for current := fromTree; current != nil; {
		next := current.parent
		current.parent = prev
		if prev != nil {
			prev.removeChild(current)
			current.addChild(prev)
		}
		prev = current
		current = next
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
	for current := fromNode; current != nil; current = current.parent {
		path = append(path, current.value)
	}
	reverseStrings(path)
	return path
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

func joinStrings(strings []string, sep string) string {
	if len(strings) == 0 {
		return ""
	}
	n := len(sep) * (len(strings) - 1)
	for _, s := range strings {
		n += len(s)
	}
	b := make([]byte, n)
	bp := copy(b, strings[0])
	for _, s := range strings[1:] {
		bp += copy(b[bp:], sep)
		bp += copy(b[bp:], s)
	}
	return string(b)
}

func reverseStrings(s []string) {
	for i, j := 0, len(s)-1; i < j; i, j = i+1, j-1 {
		s[i], s[j] = s[j], s[i]
	}
}