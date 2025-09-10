package linkedlist

import "errors"

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
	newNode := &Node{Val: v, next: l.head}
	if l.size == 0 {
		l.tail = newNode
	} else {
		l.head.prev = newNode
	}
	l.head = newNode
	l.size++
}

func (l *List) PushBack(v interface{}) {
	newNode := &Node{Val: v, prev: l.tail}
	if l.size == 0 {
		l.head = newNode
	} else {
		l.tail.next = newNode
	}
	l.tail = newNode
	l.size++
}

func (l *List) PopFront() (interface{}, error) {
	if l.size == 0 {
		return nil, ErrEmptyList
	}
	result := l.head.Val
	l.head = l.head.next
	if l.head != nil {
		l.head.prev = nil
	} else {
		l.tail = nil
	}
	l.size--
	return result, nil
}

func (l *List) PopBack() (interface{}, error) {
	if l.size == 0 {
		return nil, ErrEmptyList
	}
	result := l.tail.Val
	l.tail = l.tail.prev
	if l.tail != nil {
		l.tail.next = nil
	} else {
		l.head = nil
	}
	l.size--
	return result, nil
}

func (l *List) Reverse() {
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