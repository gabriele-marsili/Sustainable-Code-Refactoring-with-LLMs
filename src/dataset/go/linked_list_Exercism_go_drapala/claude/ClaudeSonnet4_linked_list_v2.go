package linkedlist

import (
	"fmt"
)

type List struct {
	head *Node
	tail *Node
}

type Node struct {
	Val interface{}
	next *Node
	prev *Node
}

var ErrEmptyList = fmt.Errorf("empty list")

func NewList(args ...interface{}) *List {
	if len(args) == 0 {
		return &List{}
	}
	
	l := &List{}
	var prevNode *Node
	
	for _, v := range args {
		currNode := &Node{Val: v}
		
		if prevNode == nil {
			l.head = currNode
		} else {
			prevNode.next = currNode
			currNode.prev = prevNode
		}
		
		prevNode = currNode
	}
	
	l.tail = prevNode
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
	
	if l.head != nil {
		l.head.prev = newNode
	} else {
		l.tail = newNode
	}
	
	l.head = newNode
}

func (l *List) PushBack(v interface{}) {
	newNode := &Node{Val: v, prev: l.tail}
	
	if l.tail != nil {
		l.tail.next = newNode
	} else {
		l.head = newNode
	}
	
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
	l.head, l.tail = l.tail, l.head
	
	for curr := l.head; curr != nil; curr = curr.next {
		curr.next, curr.prev = curr.prev, curr.next
	}
}

func (l *List) First() *Node {
	return l.head
}

func (l *List) Last() *Node {
	return l.tail
}