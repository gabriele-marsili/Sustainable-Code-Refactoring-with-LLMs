package linkedlist

import "errors"

type List struct {
	head *Element
	tail *Element
	len  int
}

type Element struct {
	Val  interface{}
	next *Element
	prev *Element
}

var ErrEmptyList = errors.New("Empty List")

func NewList(items ...interface{}) *List {
	ll := List{}
	for _, item := range items {
		ll.PushBack(item)
	}
	return &ll
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
	list.len++
}

func (list *List) PushFront(item interface{}) {
	e := &Element{Val: item, next: list.head}
	if list.head == nil {
		list.tail = e
	} else {
		list.head.prev = e
	}
	list.head = e
	list.len++
}

func (list *List) PopBack() (interface{}, error) {
	if list.len == 0 {
		return nil, ErrEmptyList
	}
	element := list.tail
	list.tail = element.prev
	if list.tail == nil {
		list.head = nil
	} else {
		list.tail.next = nil
	}
	list.len--
	return element.Val, nil
}

func (list *List) PopFront() (interface{}, error) {
	if list.len == 0 {
		return nil, ErrEmptyList
	}
	element := list.head
	list.head = element.next
	if list.head == nil {
		list.tail = nil
	} else {
		list.head.prev = nil
	}
	list.len--
	return element.Val, nil
}

func (list *List) Reverse() {
	if list.len <= 1 {
		return
	}

	current := list.head
	for current != nil {
		current.next, current.prev = current.prev, current.next
		current = current.prev
	}

	list.head, list.tail = list.tail, list.head
}