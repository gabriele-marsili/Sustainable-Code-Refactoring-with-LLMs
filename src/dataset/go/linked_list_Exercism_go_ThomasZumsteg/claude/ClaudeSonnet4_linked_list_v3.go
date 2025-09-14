package linkedlist

import "errors"

type List struct {
	head *Element
	tail *Element
	size int
}

type Element struct {
	Val  interface{}
	next *Element
	prev *Element
}

var ErrEmptyList = errors.New("Empty List")

func NewList(items ...interface{}) *List {
	if len(items) == 0 {
		return &List{}
	}
	
	ll := &List{size: len(items)}
	
	if len(items) == 1 {
		e := &Element{Val: items[0]}
		ll.head = e
		ll.tail = e
		return ll
	}
	
	head := &Element{Val: items[0]}
	ll.head = head
	prev := head
	
	for i := 1; i < len(items)-1; i++ {
		curr := &Element{Val: items[i], prev: prev}
		prev.next = curr
		prev = curr
	}
	
	tail := &Element{Val: items[len(items)-1], prev: prev}
	prev.next = tail
	ll.tail = tail
	
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
	list.size++
}

func (list *List) PushFront(item interface{}) {
	e := &Element{Val: item, next: list.head}
	if list.head == nil {
		list.tail = e
	} else {
		list.head.prev = e
	}
	list.head = e
	list.size++
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
	
	list.size--
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
	
	list.size--
	return val, nil
}

func (list *List) Reverse() {
	if list.head == nil || list.head == list.tail {
		return
	}
	
	curr := list.head
	for curr != nil {
		curr.next, curr.prev = curr.prev, curr.next
		curr = curr.prev
	}
	list.head, list.tail = list.tail, list.head
}