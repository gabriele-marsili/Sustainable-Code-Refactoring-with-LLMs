package brackets

type bracketType int

const TestVersion = 2

const (
	openBracket bracketType = iota
	closeBracket
	notABracket
)

var pairs = map[rune]rune{'{': '}', '[': ']', '(': ')'}

var bracketTypes = map[rune]bracketType{
	'{': openBracket,
	'[': openBracket,
	'(': openBracket,
	'}': closeBracket,
	']': closeBracket,
	')': closeBracket,
}

func Bracket(phrase string) (bool, error) {
	stack := make([]rune, 0, len(phrase)/2)
	
	for _, char := range phrase {
		switch bracketTypes[char] {
		case openBracket:
			stack = append(stack, pairs[char])
		case closeBracket:
			if len(stack) == 0 || stack[len(stack)-1] != char {
				return false, nil
			}
			stack = stack[:len(stack)-1]
		}
	}
	
	return len(stack) == 0, nil
}

func getBracketType(char rune) bracketType {
	if bType, exists := bracketTypes[char]; exists {
		return bType
	}
	return notABracket
}