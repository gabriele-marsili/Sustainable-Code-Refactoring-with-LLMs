package linkedlist

import "errors"

type Element struct {
	value int
	next  *Element
}

type List struct {
	head *Element
	tail *Element
	size int
}

func New(elements []int) *List {
	if len(elements) == 0 {
		return &List{}
	}
	
	head := &Element{value: elements[0]}
	current := head
	
	for i := 1; i < len(elements); i++ {
		current.next = &Element{value: elements[i]}
		current = current.next
	}
	
	return &List{
		head: head,
		tail: current,
		size: len(elements),
	}
}

func (l *List) Size() int {
	return l.size
}

func (l *List) Push(element int) {
	newElement := &Element{value: element}
	
	if l.head == nil {
		l.head = newElement
		l.tail = newElement
	} else {
		l.tail.next = newElement
		l.tail = newElement
	}
	
	l.size++
}

func (l *List) Pop() (int, error) {
	if l.head == nil {
		return 0, errors.New("list is empty")
	}
	
	if l.head == l.tail {
		value := l.head.value
		l.head = nil
		l.tail = nil
		l.size = 0
		return value, nil
	}
	
	current := l.head
	for current.next != l.tail {
		current = current.next
	}
	
	value := l.tail.value
	l.tail = current
	l.tail.next = nil
	l.size--
	
	return value, nil
}

func (l *List) Array() []int {
	if l.size == 0 {
		return []int{}
	}
	
	result := make([]int, 0, l.size)
	current := l.head
	
	for current != nil {
		result = append(result, current.value)
		current = current.next
	}
	
	return result
}

func (l *List) Reverse() *List {
	if l.head == nil || l.head == l.tail {
		return &List{head: l.head, tail: l.tail, size: l.size}
	}
	
	var prev *Element
	current := l.head
	newTail := l.head
	
	for current != nil {
		next := current.next
		current.next = prev
		prev = current
		current = next
	}
	
	return &List{
		head: prev,
		tail: newTail,
		size: l.size,
	}
}