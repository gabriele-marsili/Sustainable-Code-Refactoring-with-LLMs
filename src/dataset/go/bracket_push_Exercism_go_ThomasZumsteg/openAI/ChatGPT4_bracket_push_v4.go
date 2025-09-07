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
	stack := make([]rune, 0, len(phrase))
	for _, char := range phrase {
		if closing, ok := pairs[char]; ok {
			stack = append(stack, closing)
		} else if opening, ok := reversePairs[char]; ok {
			if len(stack) == 0 || stack[len(stack)-1] != char {
				return false, nil
			}
			stack = stack[:len(stack)-1]
		}
	}
	return len(stack) == 0, nil
}