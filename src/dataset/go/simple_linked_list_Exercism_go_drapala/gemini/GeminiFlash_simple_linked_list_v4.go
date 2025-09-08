package linkedlist

import "errors"

// Element represents a node in the linked list.
type Element struct {
	Value int
	Next  *Element
}

// List represents the linked list.
type List struct {
	head *Element
	size int
}

// New creates a new linked list from a slice of integers.
func New(values []int) *List {
	list := &List{}
	for _, value := range values {
		list.Push(value)
	}
	return list
}

// Size returns the number of elements in the list.
func (l *List) Size() int {
	return l.size
}

// Push adds a new element to the beginning of the list.
func (l *List) Push(element int) {
	newElement := &Element{Value: element, Next: l.head}
	l.head = newElement
	l.size++
}

// Pop removes and returns the first element from the list.
func (l *List) Pop() (int, error) {
	if l.head == nil {
		return 0, errors.New("empty list")
	}
	value := l.head.Value
	l.head = l.head.Next
	l.size--
	return value, nil
}

// Array returns a slice containing the elements of the list.
func (l *List) Array() []int {
	result := make([]int, 0, l.size)
	current := l.head
	for current != nil {
		result = append(result, current.Value)
		current = current.Next
	}
	return result
}

// Reverse reverses the list and returns a new reversed list.
func (l *List) Reverse() *List {
	newList := &List{}
	current := l.head
	for current != nil {
		newList.Push(current.Value)
		current = current.Next
	}
	return newList
}