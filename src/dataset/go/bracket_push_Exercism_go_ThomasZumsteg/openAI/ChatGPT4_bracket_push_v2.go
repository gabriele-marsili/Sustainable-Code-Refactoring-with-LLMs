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

/*Bracket determines if a string has balanced brackets*/
func Bracket(phrase string) (bool, error) {
	var stack []rune
	for _, char := range phrase {
		if closing, isOpen := pairs[char]; isOpen {
			stack = append(stack, closing)
		} else if open, isClose := reversePairs[char]; isClose {
			if len(stack) == 0 || stack[len(stack)-1] != char {
				return false, nil
			}
			stack = stack[:len(stack)-1]
		}
	}
	return len(stack) == 0, nil
}