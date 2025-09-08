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
	for i := len(elements) - 1; i >= 0; i-- {
		list.Push(elements[i])
	}
	return list
}

func (l *List) Size() int {
	return l.size
}

func (l *List) Push(element int) {
	newElement := &Element{value: element, tail: l.head}
	l.head = newElement
	l.size++
}

func (l *List) Pop() (int, error) {
	if l.head == nil {
		return 0, errors.New("cannot Pop() when list is empty")
	}

	value := l.head.value
	l.head = l.head.tail
	l.size--

	return value, nil
}

func (l *List) Array() []int {
	if l.size == 0 {
		return []int{}
	}
	result := make([]int, l.size)
	current := l.head
	for i := 0; i < l.size; i++ {
		result[l.size-1-i] = current.value
		current = current.tail
	}
	return result
}

func (l *List) Reverse() *List {
	newList := &List{}
	for current := l.head; current != nil; current = current.tail {
		newList.Push(current.value)
	}
	return newList
}