package linkedlist

import "errors"

// Define List and Node types here.
// Note: The tests expect Node type to include an exported field with name Value to pass.

type Node struct {
	Value interface{}
	next  *Node
	prev  *Node
}

type List struct {
	head *Node
	tail *Node
	size int
}

func NewList(elements ...interface{}) *List {
	l := &List{}
	for _, element := range elements {
		l.Push(element)
	}
	return l
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
		l.head = newNode
		l.tail = newNode
	} else {
		newNode.next = l.head
		l.head.prev = newNode
		l.head = newNode
	}
	l.size++
}

func (l *List) Push(v interface{}) {
	newNode := &Node{Value: v}
	if l.head == nil {
		l.head = newNode
		l.tail = newNode
	} else {
		newNode.prev = l.tail
		l.tail.next = newNode
		l.tail = newNode
	}
	l.size++
}

func (l *List) Shift() (interface{}, error) {
	if l.head == nil {
		return nil, errors.New("empty list")
	}
	value := l.head.Value
	l.head = l.head.next
	if l.head != nil {
		l.head.prev = nil
	} else {
		l.tail = nil // List is now empty
	}
	l.size--
	return value, nil
}

func (l *List) Pop() (interface{}, error) {
	if l.tail == nil {
		return nil, errors.New("empty list")
	}
	value := l.tail.Value
	l.tail = l.tail.prev
	if l.tail != nil {
		l.tail.next = nil
	} else {
		l.head = nil // List is now empty
	}
	l.size--
	return value, nil
}

func (l *List) Reverse() {
	if l.head == nil || l.head == l.tail {
		return // Nothing to reverse
	}

	current := l.head
	for current != nil {
		current.next, current.prev = current.prev, current.next
		current = current.prev // Move to the next node (which is now the previous)
	}

	l.head, l.tail = l.tail, l.head
}

func (l *List) First() *Node {
	return l.head
}

func (l *List) Last() *Node {
	return l.tail
}