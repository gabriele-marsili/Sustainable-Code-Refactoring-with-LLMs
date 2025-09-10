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
	stack := make([]rune, 0, len(input)) // Pre-allocate stack

	for _, token := range input {
		if openBracket, isOpen := openToCloseBracket[token]; isOpen {
			stack = append(stack, token)
		} else if openBracket, isClose := closeToOpenBracket[token]; isClose {
			stackLen := len(stack)
			if stackLen == 0 {
				return false
			}

			lastOpen := stack[stackLen-1]
			if lastOpen != openBracket {
				return false
			}
			stack = stack[:stackLen-1] // Efficient pop
		}
	}

	return len(stack) == 0
}