package linkedlist

import "errors"

// Define the List and Element types here.
type List struct {
	head *Element
	size int
}

type Element struct {
	value int
	tail  *Element
}

func New(elements []int) *List {
	list := new(List)
	if len(elements) == 0 {
		return list
	}

	var head *Element
	for i := len(elements) - 1; i >= 0; i-- {
		head = &Element{value: elements[i], tail: head}
		list.size++
	}
	list.head = head

	return list
}

func (l *List) Size() int {
	return l.size
}

func (l *List) Push(element int) {
	l.head = &Element{
		value: element,
		tail:  l.head,
	}
	l.size++
}

func (l *List) Pop() (int, error) {
	if l.head == nil {
		return 0, errors.New("cannot Pop() when list is empty")
	}

	val := l.head.value
	l.head = l.head.tail
	l.size--

	return val, nil
}

func (l *List) Array() []int {
	if l.size == 0 {
		return []int{}
	}

	ints := make([]int, l.size)
	elem := l.head
	for i := 0; i < l.size; i++ {
		ints[i] = elem.value
		elem = elem.tail
	}

	return ints
}

func (l *List) Reverse() *List {
	list := new(List)
	if l.size == 0 {
		return list
	}

	var head *Element
	for elem := l.head; elem != nil; elem = elem.tail {
		head = &Element{value: elem.value, tail: head}
	}
	list.head = head
	list.size = l.size

	return list
}