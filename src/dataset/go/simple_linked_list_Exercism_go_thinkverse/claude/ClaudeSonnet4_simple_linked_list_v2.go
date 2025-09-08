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
	if len(elements) == 0 {
		return &List{}
	}

	list := &List{size: len(elements)}
	
	// Build list in reverse order to avoid repeated traversals
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

	value := l.head.value
	l.head = l.head.tail
	l.size--

	return value, nil
}

func (l *List) Array() []int {
	if l.size == 0 {
		return nil
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
	if l.head == nil {
		return &List{}
	}

	reversed := &List{size: l.size}

	for elem := l.head; elem != nil; elem = elem.tail {
		reversed.head = &Element{
			value: elem.value,
			tail:  reversed.head,
		}
	}

	return reversed
}