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
	if len(elements) == 0 {
		return &List{}
	}

	list := &List{size: len(elements)}
	
	for i := len(elements) - 1; i >= 0; i-- {
		list.head = &Element{
			value: elements[i],
			tail:  list.head,
		}
	}

	return list
}

func (l *List) Size() int {
	return l.size
}

func (l *List) Push(element int) {
	l.size++
	l.head = &Element{
		value: element,
		tail:  l.head,
	}
}

func (l *List) Pop() (int, error) {
	if l.head == nil {
		return -1, errors.New("cannot Pop() when list is empty")
	}

	head := l.head
	l.head = head.tail
	l.size--

	return head.value, nil
}

func (l *List) Array() []int {
	if l.size == 0 {
		return []int{}
	}

	ints := make([]int, l.size)
	idx := l.size - 1

	for elem := l.head; elem != nil; elem = elem.tail {
		ints[idx] = elem.value
		idx--
	}

	return ints
}

func (l *List) Reverse() *List {
	if l.size == 0 {
		return &List{}
	}

	list := &List{size: l.size}

	for elem := l.head; elem != nil; elem = elem.tail {
		list.head = &Element{
			value: elem.value,
			tail:  list.head,
		}
	}

	return list
}