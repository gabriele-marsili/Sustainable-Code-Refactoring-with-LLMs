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
var openBrackets = map[rune]bool{'{': true, '[': true, '(': true}
var closeBrackets = map[rune]bool{'}': true, ']': true, ')': true}

/*Bracket determines if a strings has balanced brackets*/
func Bracket(phrase string) (bool, error) {
	queue := make([]rune, 0, len(phrase))
	for _, v := range phrase {
		if _, isOpen := openBrackets[v]; isOpen {
			queue = append(queue, pairs[v])
		} else if _, isClose := closeBrackets[v]; isClose {
			if len(queue) > 0 && queue[len(queue)-1] == v {
				queue = queue[:len(queue)-1]
			} else {
				return false, nil
			}
		}
	}
	return len(queue) == 0, nil
}

/*getBracketType determines the type of bracket*/
func getBracketType(char rune) bracketType {
	if _, ok := openBrackets[char]; ok {
		return openBracket
	}
	if _, ok := closeBrackets[char]; ok {
		return closeBracket
	}
	return notABracket
}