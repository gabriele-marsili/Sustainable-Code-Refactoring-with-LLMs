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
		if openBracket, ok := openToCloseBracket[token]; ok {
			stack = append(stack, token)
			_ = openBracket // Use openBracket to avoid "declared but not used" error
		} else if openBracket, ok := closeToOpenBracket[token]; ok {
			if len(stack) == 0 {
				return false
			}
			top := stack[len(stack)-1]
			if top != openBracket {
				return false
			}
			stack = stack[:len(stack)-1]
		}
	}

	return len(stack) == 0
}