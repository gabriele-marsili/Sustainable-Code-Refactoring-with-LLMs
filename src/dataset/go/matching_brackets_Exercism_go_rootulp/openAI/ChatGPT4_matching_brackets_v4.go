package brackets

func Bracket(input string) bool {
	stack := []rune{}
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

var openToCloseBracket = map[rune]rune{
	'[': ']',
	'{': '}',
	'(': ')',
}

func isCloseBracket(r rune) bool {
	return r == ']' || r == '}' || r == ')'
}