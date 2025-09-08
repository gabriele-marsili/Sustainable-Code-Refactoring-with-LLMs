package linkedlist

import "errors"

type List struct {
	head *Element
	size int
}

type Element struct {
	value int
	tail  *Element
}

func New(elements []int) *List {
	list := &List{}
	for i := len(elements) - 1; i >= 0; i-- {
		list.Push(elements[i])
	}
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
		return -1, errors.New("cannot Pop() when list is empty")
	}
	value := l.head.value
	l.head = l.head.tail
	l.size--
	return value, nil
}

func (l *List) Array() []int {
	ints := make([]int, l.size)
	i := 0
	for elem := l.head; elem != nil; elem = elem.tail {
		ints[i] = elem.value
		i++
	}
	return ints
}

func (l *List) Reverse() *List {
	reversed := &List{}
	for elem := l.head; elem != nil; elem = elem.tail {
		reversed.Push(elem.value)
	}
	return reversed
}