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
		if _, isOpen := openToCloseBracket[token]; isOpen {
			stack = append(stack, token)
		} else if closeBrackets[token] {
			if len(stack) == 0 || openToCloseBracket[stack[len(stack)-1]] != token {
				return false
			}
			stack = stack[:len(stack)-1]
		}
	}
	return len(stack) == 0
}