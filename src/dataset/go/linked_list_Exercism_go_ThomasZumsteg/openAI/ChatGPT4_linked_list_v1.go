package linkedlist

import "errors"

type List struct {
	head *Element
	tail *Element
}

type Element struct {
	Val  interface{}
	next *Element
	prev *Element
}

var ErrEmptyList = errors.New("Empty List")

func NewList(items ...interface{}) *List {
	ll := &List{}
	for _, item := range items {
		ll.PushBack(item)
	}
	return ll
}

func (list *List) First() *Element {
	return list.head
}

func (list *List) Last() *Element {
	return list.tail
}

func (element *Element) Prev() *Element {
	return element.prev
}

func (element *Element) Next() *Element {
	return element.next
}

func (list *List) PushBack(item interface{}) {
	e := &Element{Val: item, prev: list.tail}
	if list.tail == nil {
		list.head = e
	} else {
		list.tail.next = e
	}
	list.tail = e
}

func (list *List) PushFront(item interface{}) {
	e := &Element{Val: item, next: list.head}
	if list.head == nil {
		list.tail = e
	} else {
		list.head.prev = e
	}
	list.head = e
}

func (list *List) PopBack() (interface{}, error) {
	if list.tail == nil {
		return nil, ErrEmptyList
	}
	val := list.tail.Val
	list.tail = list.tail.prev
	if list.tail == nil {
		list.head = nil
	} else {
		list.tail.next = nil
	}
	return val, nil
}

func (list *List) PopFront() (interface{}, error) {
	if list.head == nil {
		return nil, ErrEmptyList
	}
	val := list.head.Val
	list.head = list.head.next
	if list.head == nil {
		list.tail = nil
	} else {
		list.head.prev = nil
	}
	return val, nil
}

func (list *List) Reverse() {
	current := list.head
	for current != nil {
		current.next, current.prev = current.prev, current.next
		current = current.prev
	}
	list.head, list.tail = list.tail, list.head
}