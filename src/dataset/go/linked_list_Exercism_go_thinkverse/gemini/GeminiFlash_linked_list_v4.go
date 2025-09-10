package linkedlist

import "errors"

// Node represents a node in the linked list.
type Node struct {
	Value interface{}
	next  *Node
	prev  *Node
}

// List represents a doubly linked list.
type List struct {
	head *Node
	tail *Node
	size int
}

// NewList creates a new linked list with the given elements.
func NewList(elements ...interface{}) *List {
	l := &List{}
	for _, element := range elements {
		l.Push(element)
	}
	return l
}

// Next returns the next node in the list.
func (n *Node) Next() *Node {
	if n == nil {
		return nil
	}
	return n.next
}

// Prev returns the previous node in the list.
func (n *Node) Prev() *Node {
	if n == nil {
		return nil
	}
	return n.prev
}

// Unshift adds a new node with the given value to the beginning of the list.
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

// Push adds a new node with the given value to the end of the list.
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

// Shift removes the first node from the list and returns its value.
func (l *List) Shift() (interface{}, error) {
	if l.head == nil {
		return nil, errors.New("list is empty")
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

// Pop removes the last node from the list and returns its value.
func (l *List) Pop() (interface{}, error) {
	if l.tail == nil {
		return nil, errors.New("list is empty")
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

// Reverse reverses the order of the nodes in the list.
func (l *List) Reverse() {
	current := l.head
	var prev *Node
	for current != nil {
		next := current.next
		current.next = prev
		current.prev = next
		prev = current
		current = next
	}
	l.head, l.tail = l.tail, l.head
}

// First returns the first node in the list.
func (l *List) First() *Node {
	return l.head
}

// Last returns the last node in the list.
func (l *List) Last() *Node {
	return l.tail
}