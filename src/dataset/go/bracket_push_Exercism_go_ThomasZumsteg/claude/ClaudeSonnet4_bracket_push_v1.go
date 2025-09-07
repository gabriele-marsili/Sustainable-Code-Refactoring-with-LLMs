package brackets

//bracketType sorts characters into either opening, closing, or not a bracket
type bracketType int

//TestVersion is the version of unit tests that this will pass
const TestVersion = 2

const (
	openBracket bracketType = iota
	closeBracket
	notABracket
)

//bracketPairs are the matching pairs of brackets
var pairs = map[rune]rune{'{': '}', '[': ']', '(': ')'}

// Pre-computed lookup maps for O(1) bracket type detection
var openBrackets = map[rune]bool{'{': true, '[': true, '(': true}
var closeBrackets = map[rune]rune{'}': '{', ']': '[', ')': '('}

/*Bracket determines if a strings has balanced brackets*/
func Bracket(phrase string) (bool, error) {
	var stack []rune
	
	for _, char := range phrase {
		if openBrackets[char] {
			stack = append(stack, char)
		} else if expectedOpen, isClosing := closeBrackets[char]; isClosing {
			if len(stack) == 0 || stack[len(stack)-1] != expectedOpen {
				return false, nil
			}
			stack = stack[:len(stack)-1]
		}
	}
	
	return len(stack) == 0, nil
}

/*getBracketType determines the type of bracket*/
func getBracketType(char rune) bracketType {
	if openBrackets[char] {
		return openBracket
	}
	if _, exists := closeBrackets[char]; exists {
		return closeBracket
	}
	return notABracket
}