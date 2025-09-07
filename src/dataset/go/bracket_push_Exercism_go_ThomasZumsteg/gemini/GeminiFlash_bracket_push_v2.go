package brackets

// TestVersion is the version of unit tests that this will pass
const TestVersion = 2

// bracketPairs are the matching pairs of brackets
var pairs = map[rune]rune{'{': '}', '[': ']', '(': ')'}
var openBrackets = map[rune]bool{'{': true, '[': true, '(': true}
var closeBrackets = map[rune]bool{'}': true, ']': true, ')': true}

/*Bracket determines if a strings has balanced brackets*/
func Bracket(phrase string) (bool, error) {
	var queue []rune
	for _, v := range phrase {
		if _, isOpen := openBrackets[v]; isOpen {
			queue = append(queue, pairs[v])
		} else if _, isClose := closeBrackets[v]; isClose {
			if len(queue) == 0 || queue[len(queue)-1] != v {
				return false, nil
			}
			queue = queue[:len(queue)-1]
		}
	}
	return len(queue) == 0, nil
}