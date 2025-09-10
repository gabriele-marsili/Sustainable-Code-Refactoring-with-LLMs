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
	stack := make([]rune, 0, len(input)) // Initialize stack with capacity
	for _, token := range input {
		if open, ok := openToCloseBracket[token]; ok {
			stack = append(stack, token)
		} else if openBracket, ok := closeToOpenBracket[token]; ok {
			if len(stack) == 0 || stack[len(stack)-1] != openBracket {
				return false
			}
			stack = stack[:len(stack)-1] // Efficient pop
		}
	}
	return len(stack) == 0
}