package linkedlist

import "errors"

// Define List and Node types here.
type List struct {
	head *Node
	tail *Node
	size int
}

type Node struct {
	Val  interface{}
	next *Node
	prev *Node
}

var ErrEmptyList = errors.New("empty list")

func NewList(args ...interface{}) *List {
	list := &List{}
	for _, v := range args {
		list.PushBack(v)
	}
	return list
}

func (n *Node) Next() *Node {
	return n.next
}

func (n *Node) Prev() *Node {
	return n.prev
}

func (l *List) PushFront(v interface{}) {
	newNode := &Node{Val: v}

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

func (l *List) PushBack(v interface{}) {
	newNode := &Node{Val: v}

	if l.tail == nil {
		l.head = newNode
		l.tail = newNode
	} else {
		newNode.prev = l.tail
		l.tail.next = newNode
		l.tail = newNode
	}
	l.size++
}

func (l *List) PopFront() (interface{}, error) {
	if l.head == nil {
		return nil, ErrEmptyList
	}

	val := l.head.Val
	l.head = l.head.next

	if l.head == nil {
		l.tail = nil
	} else {
		l.head.prev = nil
	}

	l.size--
	return val, nil
}

func (l *List) PopBack() (interface{}, error) {
	if l.tail == nil {
		return nil, ErrEmptyList
	}

	val := l.tail.Val
	l.tail = l.tail.prev

	if l.tail == nil {
		l.head = nil
	} else {
		l.tail.next = nil
	}

	l.size--
	return val, nil
}

func (l *List) Reverse() {
	current := l.head
	var prev *Node = nil
	var next *Node = nil

	for current != nil {
		next = current.next
		current.next = prev
		current.prev = next
		prev = current
		current = next
	}

	l.head = l.tail
	l.tail = prev
}

func (l *List) First() *Node {
	return l.head
}

func (l *List) Last() *Node {
	return l.tail
}