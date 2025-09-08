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
	list := &List{}
	for _, element := range elements {
		list.Push(element)
	}
	return list
}

func (l *List) Size() int {
	return l.size
}

func (l *List) Push(element int) {
	newElement := &Element{value: element, next: l.head}

	if l.head == nil {
		l.tail = newElement
	}

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

	if l.head == nil {
		l.tail = nil
	}

	return value, nil
}

func (l *List) Array() []int {
	if l.size == 0 {
		return []int{}
	}

	result := make([]int, 0, l.size)
	for elem := l.head; elem != nil; elem = elem.next {
		result = append(result, elem.value)
	}

	// Reverse the slice in-place for efficiency
	for i, j := 0, len(result)-1; i < j; i, j = i+1, j-1 {
		result[i], result[j] = result[j], result[i]
	}

	return result
}

func (l *List) Reverse() *List {
	newList := &List{}
	for elem := l.head; elem != nil; elem = elem.next {
		newList.Push(elem.value)
	}
	return newList
}