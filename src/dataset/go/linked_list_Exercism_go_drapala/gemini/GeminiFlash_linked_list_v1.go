package linkedlist

import (
	"fmt"
)

type List struct {
	head *Node
	tail *Node
}

type Node struct {
	Val  interface{}
	next *Node
	prev *Node
}

var ErrEmptyList = fmt.Errorf("empty list")

func NewList(args ...interface{}) *List {
	l := &List{}
	if len(args) == 0 {
		return l
	}

	head := &Node{Val: args[0]}
	l.head = head
	tail := head

	for i := 1; i < len(args); i++ {
		newNode := &Node{Val: args[i], prev: tail}
		tail.next = newNode
		tail = newNode
	}

	l.tail = tail
	return l
}

func (n *Node) Next() *Node {
	return n.next
}

func (n *Node) Prev() *Node {
	return n.prev
}

func (l *List) PushFront(v interface{}) {
	newNode := &Node{Val: v, next: l.head}
	if l.head == nil {
		l.head = newNode
		l.tail = newNode
		return
	}
	l.head.prev = newNode
	l.head = newNode
}

func (l *List) PushBack(v interface{}) {
	newNode := &Node{Val: v, prev: l.tail}
	if l.tail == nil {
		l.head = newNode
		l.tail = newNode
		return
	}
	l.tail.next = newNode
	l.tail = newNode
}

func (l *List) PopFront() (interface{}, error) {
	if l.head == nil {
		return nil, ErrEmptyList
	}

	v := l.head.Val
	l.head = l.head.next

	if l.head != nil {
		l.head.prev = nil
	} else {
		l.tail = nil
	}

	return v, nil
}

func (l *List) PopBack() (interface{}, error) {
	if l.tail == nil {
		return nil, ErrEmptyList
	}

	v := l.tail.Val
	l.tail = l.tail.prev

	if l.tail != nil {
		l.tail.next = nil
	} else {
		l.head = nil
	}

	return v, nil
}

func (l *List) Reverse() {
	if l.head == nil || l.head == l.tail {
		return
	}

	l.head, l.tail = l.tail, l.head

	curr := l.head
	for curr != nil {
		curr.next, curr.prev = curr.prev, curr.next
		curr = curr.next
	}
}

func (l *List) First() *Node {
	return l.head
}

func (l *List) Last() *Node {
	return l.tail
}