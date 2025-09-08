package linkedlist

import (
	"errors"
)

// Define the List and Element types here.
type List struct {
	head *Element
	tail *Element
	size int
}

type Element struct {
	data int
	next *Element
}

func New(array []int) (result *List) {
	result = &List{}
	for _, v := range array {
		result.Push(v)
	}
	return result
}

func (l *List) Size() int {
	return l.size
}

func (l *List) Push(data int) {
	element := &Element{data: data}
	if l.head == nil {
		l.head = element
		l.tail = element
	} else {
		l.tail.next = element
		l.tail = element
	}
	l.size++
}

func (l *List) Pop() (result int, e error) {
	if l.head == nil {
		return 0, errors.New("attempted to pop from empty list")
	}

	result = l.tail.data
	l.size--

	if l.head == l.tail {
		l.head = nil
		l.tail = nil
		return result, nil
	}

	current := l.head
	for current.next != l.tail {
		current = current.next
	}
	current.next = nil
	l.tail = current

	return result, nil
}

func (l *List) Array() (result []int) {
	result = make([]int, 0, l.size)
	current := l.head
	for current != nil {
		result = append(result, current.data)
		current = current.next
	}
	return result
}

func (l *List) Reverse() *List {
	newList := &List{}
	current := l.head
	for current != nil {
		newHead := &Element{data: current.data, next: newList.head}
		newList.head = newHead
		if newList.tail == nil {
			newList.tail = newHead
		}
		current = current.next
		newList.size++
	}
	return newList
}