package brackets

// bracketType sorts characters into either opening, closing, or not a bracket
type bracketType int

// TestVersion is the version of unit tests that this will pass
const TestVersion = 2

const (
	openBracket bracketType = iota
	closeBracket
	notABracket
)

// bracketPairs are the matching pairs of brackets
var pairs = map[rune]rune{'{': '}', '[': ']', '(': ')'}

// reversePairs maps closing brackets to their corresponding opening brackets
var reversePairs = map[rune]rune{'}': '{', ']': '[', ')': '('}

/* Bracket determines if a string has balanced brackets */
func Bracket(phrase string) (bool, error) {
	var stack []rune
	for _, char := range phrase {
		switch getBracketType(char) {
		case openBracket:
			stack = append(stack, char)
		case closeBracket:
			if len(stack) == 0 || stack[len(stack)-1] != reversePairs[char] {
				return false, nil
			}
			stack = stack[:len(stack)-1]
		}
	}
	return len(stack) == 0, nil
}

/* getBracketType determines the type of bracket */
func getBracketType(char rune) bracketType {
	if _, ok := pairs[char]; ok {
		return openBracket
	}
	if _, ok := reversePairs[char]; ok {
		return closeBracket
	}
	return notABracket
}