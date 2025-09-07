package brackets

type bracketType int

const TestVersion = 2

const (
	openBracket bracketType = iota
	closeBracket
	notABracket
)

var openBrackets = map[rune]rune{'{': '}', '[': ']', '(': ')'}
var closeBrackets = map[rune]rune{'}': '{', ']': '[', ')': '('}

func Bracket(phrase string) (bool, error) {
	stack := make([]rune, 0, len(phrase)/2)
	
	for _, char := range phrase {
		if expected, isOpen := openBrackets[char]; isOpen {
			stack = append(stack, expected)
		} else if _, isClose := closeBrackets[char]; isClose {
			if len(stack) == 0 || stack[len(stack)-1] != char {
				return false, nil
			}
			stack = stack[:len(stack)-1]
		}
	}
	
	return len(stack) == 0, nil
}

func getBracketType(char rune) bracketType {
	if _, isOpen := openBrackets[char]; isOpen {
		return openBracket
	}
	if _, isClose := closeBrackets[char]; isClose {
		return closeBracket
	}
	return notABracket
}