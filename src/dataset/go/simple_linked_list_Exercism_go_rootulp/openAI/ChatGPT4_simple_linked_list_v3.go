package linkedlist

import (
	"errors"
	"fmt"
)

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

func New(array []int) *List {
	list := &List{}
	if array == nil {
		return list
	}
	for _, v := range array {
		list.Push(v)
	}
	return list
}

func (l *List) Size() int {
	return l.size
}

func (l *List) Push(data int) {
	element := &Element{data: data}
	l.size++
	if l.head == nil {
		l.head = element
		l.tail = element
		return
	}
	l.tail.next = element
	l.tail = element
}

func (l *List) Pop() (int, error) {
	if l.head == nil {
		return 0, errors.New("attempted to pop from empty list")
	}
	if l.size == 1 {
		data := l.head.data
		l.head = nil
		l.tail = nil
		l.size--
		return data, nil
	}
	current := l.head
	for current.next != l.tail {
		current = current.next
	}
	data := l.tail.data
	current.next = nil
	l.tail = current
	l.size--
	return data, nil
}

func (l *List) Array() []int {
	result := make([]int, 0, l.size)
	for current := l.head; current != nil; current = current.next {
		result = append(result, current.data)
	}
	return result
}

func (l *List) Reverse() *List {
	if l.size <= 1 {
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

func reverse(slice []int) []int {
	for i, j := 0, len(slice)-1; i < j; i, j = i+1, j-1 {
		slice[i], slice[j] = slice[j], slice[i]
	}
	return slice
}