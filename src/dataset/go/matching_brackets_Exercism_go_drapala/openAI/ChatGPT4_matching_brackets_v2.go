package brackets

func BracketSequenceCorrect(input string) bool {
	var stack []rune
	bracketMap := map[rune]rune{']': '[', ')': '(', '}': '{'}

	for _, c := range input {
		if c == '[' || c == '(' || c == '{' { // Open Bracket
			stack = append(stack, c) // Push to stack
		} else if match, ok := bracketMap[c]; ok { // Close Bracket
			if len(stack) == 0 || stack[len(stack)-1] != match { // Mismatch or empty stack
				return false
			}
			stack = stack[:len(stack)-1] // Pop
		}
	}

	return len(stack) == 0
}

func Bracket(input string) bool {
	var cleaned []rune
	bracketSet := map[rune]struct{}{
		'[': {}, ']': {}, '(': {}, ')': {}, '{': {}, '}': {},
	}

	for _, c := range input {
		if _, exists := bracketSet[c]; exists {
			cleaned = append(cleaned, c)
		}
	}
	return BracketSequenceCorrect(string(cleaned))
}