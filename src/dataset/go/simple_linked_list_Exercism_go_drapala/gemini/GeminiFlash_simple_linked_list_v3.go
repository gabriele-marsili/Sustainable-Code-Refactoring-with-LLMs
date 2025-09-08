package linkedlist

import "errors"

// Element represents a node in the linked list.
type Element struct {
	Value int
	Next  *Element
}

// List represents a singly linked list.
type List struct {
	head   *Element
	tail   *Element
	length int
}

// New creates a new linked list from a slice of integers.
func New(values []int) *List {
	l := &List{}
	for _, v := range values {
		l.Push(v)
	}
	return l
}

// Size returns the number of elements in the list.
func (l *List) Size() int {
	return l.length
}

// Push adds a new element to the end of the list.
func (l *List) Push(value int) {
	newElement := &Element{Value: value}
	if l.head == nil {
		l.head = newElement
		l.tail = newElement
	} else {
		l.tail.Next = newElement
		l.tail = newElement
	}
	l.length++
}

// Pop removes and returns the last element from the list.
func (l *List) Pop() (int, error) {
	if l.head == nil {
		return 0, errors.New("list is empty")
	}

	if l.head == l.tail {
		val := l.head.Value
		l.head = nil
		l.tail = nil
		l.length--
		return val, nil
	}

	var prev *Element
	current := l.head
	for current.Next != nil {
		prev = current
		current = current.Next
	}

	val := l.tail.Value
	l.tail = prev
	l.tail.Next = nil
	l.length--
	return val, nil
}

// Array returns a slice containing the elements of the list in order.
func (l *List) Array() []int {
	result := make([]int, 0, l.length)
	current := l.head
	for current != nil {
		result = append(result, current.Value)
		current = current.Next
	}
	return result
}

// Reverse reverses the list in place and returns it.
func (l *List) Reverse() *List {
	if l.head == nil || l.head == l.tail {
		return l
	}

	var prev *Element
	current := l.head
	l.tail = l.head

	for current != nil {
		next := current.Next
		current.Next = prev
		prev = current
		current = next
	}

	l.head = prev
	return l
}