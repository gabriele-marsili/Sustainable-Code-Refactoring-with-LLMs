package brackets

func BracketSequenceCorrect(input string) bool {
	stack := make([]rune, 0, len(input)/2)
	pairs := map[rune]rune{']': '[', ')': '(', '}': '{'}

	for _, c := range input {
		switch c {
		case '[', '(', '{':
			stack = append(stack, c)
		case ']', ')', '}':
			if len(stack) == 0 || stack[len(stack)-1] != pairs[c] {
				return false
			}
			stack = stack[:len(stack)-1]
		}
	}

	return len(stack) == 0
}

func Bracket(input string) bool {
	stack := make([]rune, 0, len(input))
	for _, c := range input {
		switch c {
		case '[', ']', '(', ')', '{', '}':
			stack = append(stack, c)
		}
	}
	return BracketSequenceCorrect(string(stack))
}