package brackets

var openToCloseBracket = map[rune]rune{
	'[': ']',
	'{': '}',
	'(': ')',
}

var closeToOpenBracket = map[rune]rune{
	']': '[',
	'}': '{',
	')': '(',
}

func Bracket(input string) bool {
	stack := Stack{}
	for _, token := range input {
		if isOpenBracket(token) {
			stack.Push(token)
		} else if isCloseBracket(token) {
			if stack.Len() == 0 {
				return false
			}
			open := stack.Peek()
			stack.Pop()
			if !isMatching(open, token) {
				return false
			}
		}
	}
	return stack.Len() == 0
}

func isOpenBracket(r rune) bool {
	_, ok := openToCloseBracket[r]
	return ok
}

func isCloseBracket(r rune) bool {
	_, ok := closeToOpenBracket[r]
	return ok
}

func isMatching(open rune, close rune) bool {
	return openToCloseBracket[open] == close
}

type Stack struct {
	slice []rune
	top   int
}

func (s *Stack) Len() int {
	return s.top
}

func (s *Stack) Push(r rune) {
	if s.top == len(s.slice) {
		s.slice = append(s.slice, r)
	} else {
		s.slice[s.top] = r
	}
	s.top++
}

func (s *Stack) Peek() rune {
	return s.slice[s.top-1]
}

func (s *Stack) Pop() rune {
	s.top--
	return s.slice[s.top]
}