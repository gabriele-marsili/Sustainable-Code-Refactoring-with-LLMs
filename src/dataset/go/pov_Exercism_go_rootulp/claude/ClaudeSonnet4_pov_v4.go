package pov

type Tree struct {
	value    string
	children []*Tree
	parent   *Tree
}

func New(value string, children ...*Tree) *Tree {
	if len(children) == 0 {
		return &Tree{value: value}
	}
	
	node := &Tree{
		value:    value,
		children: make([]*Tree, len(children)),
	}
	copy(node.children, children)
	
	for _, child := range node.children {
		child.parent = node
	}
	
	return node
}

func (tr *Tree) Value() string {
	return tr.value
}

func (tr *Tree) Children() []*Tree {
	if len(tr.children) == 0 {
		return nil
	}
	return tr.children
}

func (tr *Tree) String() string {
	if tr == nil {
		return "nil"
	}
	
	if len(tr.children) == 0 {
		return tr.value
	}
	
	var result strings.Builder
	result.WriteByte('(')
	result.WriteString(tr.value)
	
	for _, ch := range tr.children {
		result.WriteByte(' ')
		result.WriteString(ch.String())
	}
	
	result.WriteByte(')')
	return result.String()
}

func (tr *Tree) FromPov(from string) *Tree {
	fromTree := tr.findNode(from)
	if fromTree == nil {
		return nil
	}
	
	if fromTree.parent == nil {
		return fromTree
	}
	
	path := make([]*Tree, 0, 8)
	for current := fromTree; current != nil; current = current.parent {
		path = append(path, current)
	}
	
	fromTree.parent = nil
	for i := 0; i < len(path)-1; i++ {
		flip(path[i], path[i+1])
	}
	
	return fromTree
}

func (tr *Tree) PathTo(from, to string) []string {
	newPov := tr.FromPov(to)
	if newPov == nil {
		return nil
	}
	
	fromNode := newPov.findNode(from)
	if fromNode == nil {
		return nil
	}
	
	path := make([]string, 0, 8)
	for current := fromNode; current != nil; current = current.parent {
		path = append(path, current.value)
		if current.value == to {
			return path
		}
	}
	
	return nil
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

func flip(child *Tree, parent *Tree) {
	parent.parent = child
	parent.removeChild(child)
	child.addChild(parent)
}

func (tr *Tree) removeChild(child *Tree) {
	children := tr.children
	for i, ch := range children {
		if ch == child {
			copy(children[i:], children[i+1:])
			tr.children = children[:len(children)-1]
			return
		}
	}
}

func (tr *Tree) addChild(child *Tree) {
	tr.children = append(tr.children, child)
}