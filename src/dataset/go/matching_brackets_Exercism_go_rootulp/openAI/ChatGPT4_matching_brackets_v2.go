package brackets

func Bracket(input string) bool {
	stack := []rune{}
	for _, token := range input {
		if closing, ok := openToCloseBracket[token]; ok { // Check if it's an open bracket
			stack = append(stack, closing) // Push the expected closing bracket
		} else if len(stack) > 0 && stack[len(stack)-1] == token { // Check if it matches the last expected closing bracket
			stack = stack[:len(stack)-1] // Pop the stack
		} else if isCloseBracket(token) { // If it's a closing bracket but doesn't match
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