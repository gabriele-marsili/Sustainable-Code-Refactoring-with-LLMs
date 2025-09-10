package linkedlist

type Node struct {
	Value interface{}
	prev  *Node
	next  *Node
}

type List struct {
	head *Node
	tail *Node
	size int
}

func NewList(elements ...interface{}) *List {
	list := &List{}
	for _, el := range elements {
		list.Push(el)
	}
	return list
}

func (n *Node) Next() *Node {
	return n.next
}

func (n *Node) Prev() *Node {
	return n.prev
}

func (l *List) Unshift(v interface{}) {
	newNode := &Node{Value: v}
	if l.head == nil {
		l.head, l.tail = newNode, newNode
	} else {
		newNode.next = l.head
		l.head.prev = newNode
		l.head = newNode
	}
	l.size++
}

func (l *List) Push(v interface{}) {
	newNode := &Node{Value: v}
	if l.tail == nil {
		l.head, l.tail = newNode, newNode
	} else {
		newNode.prev = l.tail
		l.tail.next = newNode
		l.tail = newNode
	}
	l.size++
}

func (l *List) Shift() (interface{}, error) {
	if l.head == nil {
		return nil, nil
	}
	value := l.head.Value
	l.head = l.head.next
	if l.head != nil {
		l.head.prev = nil
	} else {
		l.tail = nil
	}
	l.size--
	return value, nil
}

func (l *List) Pop() (interface{}, error) {
	if l.tail == nil {
		return nil, nil
	}
	value := l.tail.Value
	l.tail = l.tail.prev
	if l.tail != nil {
		l.tail.next = nil
	} else {
		l.head = nil
	}
	l.size--
	return value, nil
}

func (l *List) Reverse() {
	if l.size < 2 {
		return
	}
	current := l.head
	var temp *Node
	l.head, l.tail = l.tail, l.head
	for current != nil {
		temp = current.next
		current.next, current.prev = current.prev, temp
		current = temp
	}
}

func (l *List) First() *Node {
	return l.head
}

func (l *List) Last() *Node {
	return l.tail
}