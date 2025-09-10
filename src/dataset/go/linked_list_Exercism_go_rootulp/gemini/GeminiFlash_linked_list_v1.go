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

	if l.size == 0 {
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

	if l.size == 0 {
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
	if l.size == 0 {
		return nil, ErrEmptyList
	}

	result := l.head.Val

	if l.size == 1 {
		l.head = nil
		l.tail = nil
	} else {
		l.head = l.head.next
		l.head.prev = nil
	}

	l.size--
	return result, nil
}

func (l *List) PopBack() (interface{}, error) {
	if l.size == 0 {
		return nil, ErrEmptyList
	}

	result := l.tail.Val

	if l.size == 1 {
		l.head = nil
		l.tail = nil
	} else {
		l.tail = l.tail.prev
		l.tail.next = nil
	}

	l.size--
	return result, nil
}

func (l *List) Reverse() {
	if l.size <= 1 {
		return
	}

	current := l.head
	for current != nil {
		current.next, current.prev = current.prev, current.next
		current = current.prev
	}

	l.head, l.tail = l.tail, l.head
}

func (l *List) First() *Node {
	return l.head
}

func (l *List) Last() *Node {
	return l.tail
}