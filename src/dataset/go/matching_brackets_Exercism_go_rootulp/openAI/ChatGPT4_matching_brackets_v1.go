package brackets

var openToCloseBracket = map[rune]rune{
	'[': ']',
	'{': '}',
	'(': ')',
}

func Bracket(input string) bool {
	stack := []rune{}
	for _, token := range input {
		if close, ok := openToCloseBracket[token]; ok { // Check if it's an open bracket
			stack = append(stack, close) // Push the expected closing bracket
		} else if len(stack) > 0 && stack[len(stack)-1] == token { // Check if it matches the last closing bracket
			stack = stack[:len(stack)-1] // Pop the stack
		} else if _, isClose := reverseLookup(token); isClose { // Invalid closing bracket
			return false
		}
	}
	return len(stack) == 0
}

func reverseLookup(r rune) (rune, bool) {
	for open, close := range openToCloseBracket {
		if close == r {
			return open, true
		}
	}
	return 0, false
}