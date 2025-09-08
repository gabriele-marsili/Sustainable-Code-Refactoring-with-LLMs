package linkedlist

import "errors"

// Element represents a node in the linked list.
type Element struct {
	Val  int
	next *Element
}

// List represents the linked list.
type List struct {
	head *Element
	size int
}

// New creates a new linked list from a slice of integers.
func New(values []int) *List {
	l := &List{}
	for _, val := range values {
		l.Push(val)
	}
	return l
}

// Size returns the number of elements in the list.
func (l *List) Size() int {
	return l.size
}

// Push adds a new element to the beginning of the list.
func (l *List) Push(element int) {
	newElement := &Element{Val: element, next: l.head}
	l.head = newElement
	l.size++
}

// Pop removes and returns the first element of the list.
func (l *List) Pop() (int, error) {
	if l.head == nil {
		return 0, errors.New("list is empty")
	}

	val := l.head.Val
	l.head = l.head.next
	l.size--
	return val, nil
}

// Array returns a slice containing the elements of the list.
func (l *List) Array() []int {
	result := make([]int, 0, l.size) // Pre-allocate slice for efficiency
	current := l.head
	for current != nil {
		result = append(result, current.Val)
		current = current.next
	}
	return result
}

// Reverse reverses the linked list in place.
func (l *List) Reverse() *List {
	var prev *Element
	current := l.head
	l.head = nil // Reset head to nil for building the reversed list
	for current != nil {
		next := current.next
		current.next = l.head // Point current.next to the new head
		l.head = current       // Update the new head
		current = next         // Move to the next node
	}
	return l
}