package linkedlist

import (
	"errors"
	"fmt"
)

// Define the List and Element types here.
type List struct {
	head *Element
	size int
}

type Element struct {
	data int
	next *Element
}

func (l *List) String() string {
	return fmt.Sprintf("(size: %d, head: %v)", l.size, l.head)
}

func (e *Element) String() string {
	return fmt.Sprintf("(data: %d, next: %v)", e.data, e.next)
}

func New(array []int) *List {
	result := &List{}
	if array == nil {
		return result
	}
	for i := len(array) - 1; i >= 0; i-- {
		result.PushFront(array[i])
	}
	return result
}

func (l *List) Size() int {
	return l.size
}

func (l *List) Push(data int) {
	element := &Element{
		data: data,
	}
	l.size++
	if l.head == nil {
		l.head = element
		return
	}
	current := l.head
	for current.next != nil {
		current = current.next
	}
	current.next = element
}

func (l *List) PushFront(data int) {
	element := &Element{
		data: data,
		next: l.head,
	}
	l.head = element
	l.size++
}

func (l *List) Pop() (int, error) {
	if l.head == nil {
		return 0, errors.New("attempted to pop from empty list")
	}
	if l.size == 1 {
		result := l.head.data
		l.head = nil
		l.size--
		return result, nil
	}
	current := l.head
	for current.next.next != nil {
		current = current.next
	}
	result := current.next.data
	current.next = nil
	l.size--
	return result, nil
}

func (l *List) Array() []int {
	result := make([]int, 0, l.size)
	current := l.head
	for current != nil {
		result = append(result, current.data)
		current = current.next
	}
	return result
}

func (l *List) Reverse() *List {
	if l.head == nil {
		return &List{}
	}
	reversed := &List{}
	current := l.head
	for current != nil {
		reversed.PushFront(current.data)
		current = current.next
	}
	return reversed
}