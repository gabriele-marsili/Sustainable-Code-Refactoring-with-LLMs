package linkedlist

import "errors"

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
	
	list.head = &Element{value: elements[0]}
	current := list.head
	
	for i := 1; i < len(elements); i++ {
		current.next = &Element{value: elements[i]}
		current = current.next
	}
	list.tail = current
	
	return list
}

func (l *List) Size() int {
	return l.size
}

func (l *List) Push(element int) {
	newElement := &Element{value: element, next: l.head}
	l.head = newElement
	
	if l.tail == nil {
		l.tail = newElement
	}
	
	l.size++
}

func (l *List) Pop() (int, error) {
	if l.head == nil {
		return -1, errors.New("cannot Pop() when list is empty")
	}

	value := l.head.value
	l.head = l.head.next
	
	if l.head == nil {
		l.tail = nil
	}
	
	l.size--
	return value, nil
}

func (l *List) Array() []int {
	if l.size == 0 {
		return []int{}
	}

	result := make([]int, l.size)
	idx := l.size - 1
	
	for elem := l.head; elem != nil; elem = elem.next {
		result[idx] = elem.value
		idx--
	}

	return result
}

func (l *List) Reverse() *List {
	if l.size == 0 {
		return &List{}
	}

	reversed := &List{size: l.size}
	
	for elem := l.head; elem != nil; elem = elem.next {
		newElement := &Element{value: elem.value, next: reversed.head}
		reversed.head = newElement
		
		if reversed.tail == nil {
			reversed.tail = newElement
		}
	}
	
	return reversed
}