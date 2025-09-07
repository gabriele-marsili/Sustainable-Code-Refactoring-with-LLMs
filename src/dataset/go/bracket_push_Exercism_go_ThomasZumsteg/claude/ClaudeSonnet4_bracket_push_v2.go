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
var openBrackets = map[rune]rune{'{': '}', '[': ']', '(': ')'}
var closeBrackets = map[rune]rune{'}': '{', ']': '[', ')': '('}

/*Bracket determines if a strings has balanced brackets*/
func Bracket(phrase string) (bool, error) {
	var stack []rune
	for _, v := range phrase {
		if expected, isOpen := openBrackets[v]; isOpen {
			stack = append(stack, expected)
		} else if _, isClose := closeBrackets[v]; isClose {
			if len(stack) == 0 || stack[len(stack)-1] != v {
				return false, nil
			}
			stack = stack[:len(stack)-1]
		}
	}
	return len(stack) == 0, nil
}

/*getBracketType determines the type of bracket*/
func getBracketType(char rune) bracketType {
	if _, isOpen := openBrackets[char]; isOpen {
		return openBracket
	}
	if _, isClose := closeBrackets[char]; isClose {
		return closeBracket
	}
	return notABracket
}