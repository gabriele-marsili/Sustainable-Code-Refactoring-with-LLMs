package brackets

func BracketSequenceCorrect(input string) bool {
	var stack []rune
	bracketPairs := map[rune]rune{
		']': '[',
		')': '(',
		'}': '{',
	}
	
	for _, c := range input {
		switch c {
		case '[', '(', '{':
			stack = append(stack, c)
		case ']', ')', '}':
			if len(stack) == 0 {
				return false
			}
			if stack[len(stack)-1] != bracketPairs[c] {
				return false
			}
			stack = stack[:len(stack)-1]
		}
	}
	
	return len(stack) == 0
}

func Bracket(input string) bool {
	var stack []rune
	bracketPairs := map[rune]rune{
		']': '[',
		')': '(',
		'}': '{',
	}
	
	for _, c := range input {
		switch c {
		case '[', '(', '{':
			stack = append(stack, c)
		case ']', ')', '}':
			if len(stack) == 0 {
				return false
			}
			if stack[len(stack)-1] != bracketPairs[c] {
				return false
			}
			stack = stack[:len(stack)-1]
		}
	}
	
	return len(stack) == 0
}