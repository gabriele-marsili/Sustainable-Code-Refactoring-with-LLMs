package linkedlist

type Element struct {
	value int
	next  *Element
}

type List struct {
	head *Element
	size int
}

func New(elements []int) *List {
	list := &List{}
	for _, el := range elements {
		list.Push(el)
	}
	return list
}

func (l *List) Size() int {
	return l.size
}

func (l *List) Push(element int) {
	newElement := &Element{value: element}
	if l.head == nil {
		l.head = newElement
	} else {
		current := l.head
		for current.next != nil {
			current = current.next
		}
		current.next = newElement
	}
	l.size++
}

func (l *List) Pop() (int, error) {
	if l.head == nil {
		return 0, fmt.Errorf("list is empty")
	}
	if l.head.next == nil {
		value := l.head.value
		l.head = nil
		l.size--
		return value, nil
	}
	current := l.head
	for current.next.next != nil {
		current = current.next
	}
	value := current.next.value
	current.next = nil
	l.size--
	return value, nil
}

func (l *List) Array() []int {
	result := make([]int, 0, l.size)
	current := l.head
	for current != nil {
		result = append(result, current.value)
		current = current.next
	}
	return result
}

func (l *List) Reverse() *List {
	reversed := &List{}
	current := l.head
	for current != nil {
		newElement := &Element{value: current.value, next: reversed.head}
		reversed.head = newElement
		current = current.next
	}
	reversed.size = l.size
	return reversed
}