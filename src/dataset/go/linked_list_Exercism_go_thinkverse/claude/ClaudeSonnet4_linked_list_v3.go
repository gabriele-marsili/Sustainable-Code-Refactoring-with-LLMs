package linkedlist

import "errors"

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
	if n == nil {
		return nil
	}
	return n.next
}

func (n *Node) Prev() *Node {
	if n == nil {
		return nil
	}
	return n.prev
}

func (l *List) Unshift(v interface{}) {
	node := &Node{Value: v}
	if l.head == nil {
		l.head = node
		l.tail = node
	} else {
		node.next = l.head
		l.head.prev = node
		l.head = node
	}
	l.size++
}

func (l *List) Push(v interface{}) {
	node := &Node{Value: v}
	if l.tail == nil {
		l.head = node
		l.tail = node
	} else {
		l.tail.next = node
		node.prev = l.tail
		l.tail = node
	}
	l.size++
}

func (l *List) Shift() (interface{}, error) {
	if l.head == nil {
		return nil, errors.New("list is empty")
	}
	
	value := l.head.Value
	l.head = l.head.next
	
	if l.head == nil {
		l.tail = nil
	} else {
		l.head.prev = nil
	}
	
	l.size--
	return value, nil
}

func (l *List) Pop() (interface{}, error) {
	if l.tail == nil {
		return nil, errors.New("list is empty")
	}
	
	value := l.tail.Value
	l.tail = l.tail.prev
	
	if l.tail == nil {
		l.head = nil
	} else {
		l.tail.next = nil
	}
	
	l.size--
	return value, nil
}

func (l *List) Reverse() {
	if l.head == nil || l.head == l.tail {
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