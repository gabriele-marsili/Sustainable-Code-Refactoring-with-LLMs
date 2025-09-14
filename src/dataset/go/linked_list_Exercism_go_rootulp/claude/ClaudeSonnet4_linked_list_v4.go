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
	if len(args) == 0 {
		return &List{}
	}
	
	list := &List{}
	for _, v := range args {
		node := &Node{Val: v, prev: list.tail}
		if list.size == 0 {
			list.head = node
		} else {
			list.tail.next = node
		}
		list.tail = node
		list.size++
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
	node := &Node{Val: v, next: l.head}
	
	if l.size == 0 {
		l.head = node
		l.tail = node
	} else {
		l.head.prev = node
		l.head = node
	}
	l.size++
}

func (l *List) PushBack(v interface{}) {
	node := &Node{Val: v, prev: l.tail}
	
	if l.size == 0 {
		l.head = node
		l.tail = node
	} else {
		l.tail.next = node
		l.tail = node
	}
	l.size++
}

func (l *List) PopFront() (interface{}, error) {
	if l.size == 0 {
		return nil, ErrEmptyList
	}
	
	result := l.head.Val
	l.head = l.head.next
	l.size--
	
	if l.size == 0 {
		l.tail = nil
	} else {
		l.head.prev = nil
	}
	
	return result, nil
}

func (l *List) PopBack() (interface{}, error) {
	if l.size == 0 {
		return nil, ErrEmptyList
	}
	
	result := l.tail.Val
	l.tail = l.tail.prev
	l.size--
	
	if l.size == 0 {
		l.head = nil
	} else {
		l.tail.next = nil
	}
	
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