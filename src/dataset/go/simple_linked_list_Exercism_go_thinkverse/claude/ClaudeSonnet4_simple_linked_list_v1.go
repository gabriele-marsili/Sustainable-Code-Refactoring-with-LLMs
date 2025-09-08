package linkedlist

import "errors"

// Define the List and Element types here.
type List struct {
	head *Element
	tail *Element
	size int
}

type Element struct {
	value int
	next  *Element
}

func New(elements []int) *List {
	if len(elements) == 0 {
		return &List{}
	}

	list := &List{size: len(elements)}
	
	// Build list in reverse order to avoid traversal
	for i := len(elements) - 1; i >= 0; i-- {
		elem := &Element{value: elements[i], next: list.head}
		list.head = elem
		if list.tail == nil {
			list.tail = elem
		}
	}

	return list
}

func (l *List) Size() int {
	return l.size
}

func (l *List) Push(element int) {
	elem := &Element{value: element, next: l.head}
	l.head = elem
	if l.tail == nil {
		l.tail = elem
	}
	l.size++
}

func (l *List) Pop() (int, error) {
	if l.head == nil {
		return -1, errors.New("cannot Pop() when list is empty")
	}

	value := l.head.value
	l.head = l.head.next
	l.size--
	
	if l.head == nil {
		l.tail = nil
	}

	return value, nil
}

func (l *List) Array() []int {
	if l.size == 0 {
		return []int{}
	}

	ints := make([]int, l.size)
	idx := l.size - 1

	for elem := l.head; elem != nil; elem = elem.next {
		ints[idx] = elem.value
		idx--
	}

	return ints
}

func (l *List) Reverse() *List {
	if l.size == 0 {
		return &List{}
	}

	reversed := &List{size: l.size}
	
	for elem := l.head; elem != nil; elem = elem.next {
		newElem := &Element{value: elem.value, next: reversed.head}
		reversed.head = newElem
		if reversed.tail == nil {
			reversed.tail = newElem
		}
	}

	return reversed
}