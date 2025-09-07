package brackets

// TestVersion is the version of unit tests that this will pass
const TestVersion = 2

// bracketPairs are the matching pairs of brackets
var pairs = map[rune]rune{'{': '}', '[': ']', '(': ')'}

/*Bracket determines if a strings has balanced brackets*/
func Bracket(phrase string) (bool, error) {
	queue := make([]rune, 0, len(phrase)/2) // Pre-allocate, assuming at least half are brackets

	for _, v := range phrase {
		closingBracket, isOpen := pairs[v]
		if isOpen {
			queue = append(queue, closingBracket)
		} else {
			isClosing := false
			for _, closing := range pairs {
				if v == closing {
					isClosing = true
					break
				}
			}

			if isClosing {
				if len(queue) > 0 && queue[len(queue)-1] == v {
					queue = queue[:len(queue)-1]
				} else {
					return false, nil
				}
			}
		}
	}
	return len(queue) == 0, nil
}