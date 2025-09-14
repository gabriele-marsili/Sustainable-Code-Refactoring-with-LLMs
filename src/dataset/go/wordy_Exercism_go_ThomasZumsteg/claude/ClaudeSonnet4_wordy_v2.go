package wordy

import (
	"strconv"
	"strings"
)

type operator func(a, b int) int

var (
	// Pre-compiled regex patterns to avoid recompilation
	parseRegex = `^What is (-?\d+)((?: (?:plus|minus|multiplied by|divided by) -?\d+)+)\?$`
	tokenRegex = ` (plus|minus|multiplied by|divided by) (-?\d+)`
	
	// operators are the valid operations
	operators = map[string]operator{
		"plus":          func(a, b int) int { return a + b },
		"minus":         func(a, b int) int { return a - b },
		"multiplied by": func(a, b int) int { return a * b },
		"divided by":    func(a, b int) int { return a / b },
	}
)

/*Answer calulates the answer to a math question.*/
func Answer(question string) (int, bool) {
	// Direct string matching instead of regex compilation
	if !strings.HasPrefix(question, "What is ") || !strings.HasSuffix(question, "?") {
		return 0, false
	}
	
	// Remove prefix and suffix
	content := question[8 : len(question)-1]
	
	// Find first number
	parts := strings.Fields(content)
	if len(parts) == 0 {
		return 0, false
	}
	
	result, err := strconv.Atoi(parts[0])
	if err != nil {
		return 0, false
	}
	
	// Process remaining tokens
	i := 1
	for i < len(parts) {
		// Get operator
		var opStr string
		if i < len(parts) && parts[i] == "multiplied" {
			if i+1 < len(parts) && parts[i+1] == "by" {
				opStr = "multiplied by"
				i += 2
			} else {
				return 0, false
			}
		} else if i < len(parts) && parts[i] == "divided" {
			if i+1 < len(parts) && parts[i+1] == "by" {
				opStr = "divided by"
				i += 2
			} else {
				return 0, false
			}
		} else if i < len(parts) {
			opStr = parts[i]
			i++
		} else {
			return 0, false
		}
		
		// Get operand
		if i >= len(parts) {
			return 0, false
		}
		
		operand, err := strconv.Atoi(parts[i])
		if err != nil {
			return 0, false
		}
		
		op, exists := operators[opStr]
		if !exists {
			return 0, false
		}
		
		result = op(result, operand)
		i++
	}
	
	return result, true
}