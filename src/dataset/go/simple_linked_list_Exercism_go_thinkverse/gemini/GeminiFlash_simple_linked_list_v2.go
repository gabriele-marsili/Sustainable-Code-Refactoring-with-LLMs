package linkedlist

import "errors"

// Define the List and Element types here.
type List struct {
	head *Element
	size int
}

type Element struct {
	value int
	next  *Element
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
	newElement := &Element{value: element, next: l.head}
	l.head = newElement
	l.size++
}

func (l *List) Pop() (int, error) {
	if l.head == nil {
		return 0, errors.New("cannot Pop() when list is empty")
	}

	value := l.head.value
	l.head = l.head.next
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
		result[i] = current.value
		current = current.next
	}
	return result
}

func (l *List) Reverse() *List {
	reversedList := &List{}
	current := l.head
	for current != nil {
		reversedList.Push(current.value)
		current = current.next
	}
	return reversedList
}