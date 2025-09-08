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
	list := &List{}
	for i := len(elements) - 1; i >= 0; i-- { // Reverse iteration to avoid multiple reallocations
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
	if l.size <= 1 {
		return l
	}

	var prev *Element
	curr := l.head

	for curr != nil {
		next := curr.tail
		curr.tail = prev
		prev = curr
		curr = next
	}

	return &List{
		head: prev,
		size: l.size,
	}
}