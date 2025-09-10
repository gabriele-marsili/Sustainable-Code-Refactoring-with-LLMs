package brackets

var openToCloseBracket = map[rune]rune{
	'[': ']',
	'{': '}',
	'(': ')',
}

func Bracket(input string) bool {
	stack := make([]rune, 0, len(input)/2)
	for _, token := range input {
		if close, ok := openToCloseBracket[token]; ok {
			stack = append(stack, close)
		} else if len(stack) > 0 && stack[len(stack)-1] == token {
			stack = stack[:len(stack)-1]
		} else if isCloseBracket(token) {
			return false
		}
	}
	return len(stack) == 0
}

func isCloseBracket(r rune) bool {
	for _, v := range openToCloseBracket {
		if r == v {
			return true
		}
	}
	return false
}