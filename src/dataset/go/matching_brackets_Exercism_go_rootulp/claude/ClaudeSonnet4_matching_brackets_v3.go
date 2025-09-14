package brackets

var openToCloseBracket = map[rune]rune{
	'[': ']',
	'{': '}',
	'(': ')',
}

var closeBrackets = map[rune]bool{
	']': true,
	'}': true,
	')': true,
}

func Bracket(input string) bool {
	stack := make([]rune, 0, len(input)/2)
	
	for _, token := range input {
		if isOpenBracket(token) {
			stack = append(stack, token)
		} else if isCloseBracket(token) {
			if len(stack) == 0 || !isMatching(stack[len(stack)-1], token) {
				return false
			}
			stack = stack[:len(stack)-1]
		}
	}
	return len(stack) == 0
}

func isOpenBracket(r rune) bool {
	_, ok := openToCloseBracket[r]
	return ok
}

func isCloseBracket(r rune) bool {
	return closeBrackets[r]
}

func isMatching(open rune, close rune) bool {
	return openToCloseBracket[open] == close
}

type Stack struct {
	slice []rune
}

func (s *Stack) Len() int {
	return len(s.slice)
}

func (s *Stack) Push(r rune) {
	s.slice = append(s.slice, r)
}

func (s *Stack) Peek() rune {
	return s.slice[len(s.slice)-1]
}

func (s *Stack) Pop() rune {
	result := s.slice[len(s.slice)-1]
	s.slice = s.slice[:len(s.slice)-1]
	return result
}