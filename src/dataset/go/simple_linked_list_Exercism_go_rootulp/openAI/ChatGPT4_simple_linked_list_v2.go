package linkedlist

import (
	"errors"
	"fmt"
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

func (l *List) String() string {
	return fmt.Sprintf("(size: %d, head: %v)", l.size, l.head)
}

func (e *Element) String() string {
	return fmt.Sprintf("(data: %d, next: %v)", e.data, e.next)
}

func New(array []int) (result *List) {
	result = &List{}
	if array == nil {
		return result
	}
	for _, v := range array {
		result.Push(v)
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
		l.tail = element
		return
	}
	l.tail.next = element
	l.tail = element
}

func (l *List) Pop() (result int, e error) {
	if l.head == nil {
		return 0, errors.New("attempted to pop from empty list")
	}
	if l.size == 1 {
		result = l.head.data
		l.head = nil
		l.tail = nil
		l.size--
		return result, nil
	}
	current := l.head
	for current.next != l.tail {
		current = current.next
	}
	result = l.tail.data
	current.next = nil
	l.tail = current
	l.size--
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
	if l.head == nil || l.size == 1 {
		return l
	}
	var prev, next *Element
	current := l.head
	l.tail = l.head
	for current != nil {
		next = current.next
		current.next = prev
		prev = current
		current = next
	}
	l.head = prev
	return l
}