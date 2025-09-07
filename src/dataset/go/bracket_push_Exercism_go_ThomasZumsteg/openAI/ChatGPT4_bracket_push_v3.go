package brackets

type bracketType int

const TestVersion = 2

const (
	openBracket bracketType = iota
	closeBracket
	notABracket
)

var pairs = map[rune]rune{'{': '}', '[': ']', '(': ')'}
var reversePairs = map[rune]rune{'}': '{', ']': '[', ')': '('}

func Bracket(phrase string) (bool, error) {
	queue := make([]rune, 0, len(phrase)/2)
	for _, v := range phrase {
		switch getBracketType(v) {
		case openBracket:
			queue = append(queue, v)
		case closeBracket:
			if len(queue) == 0 || queue[len(queue)-1] != reversePairs[v] {
				return false, nil
			}
			queue = queue[:len(queue)-1]
		}
	}
	return len(queue) == 0, nil
}

func getBracketType(char rune) bracketType {
	if _, ok := pairs[char]; ok {
		return openBracket
	}
	if _, ok := reversePairs[char]; ok {
		return closeBracket
	}
	return notABracket
}