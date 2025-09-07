package wordcount

import (
	"strings"
	"unicode"
)

type Frequency map[string]int

func WordCount(phrase string) Frequency {
	result := make(Frequency)
	
	var word strings.Builder
	word.Grow(32) // Pre-allocate reasonable capacity
	
	inWord := false
	
	for _, r := range phrase {
		if unicode.IsLetter(r) || unicode.IsDigit(r) || r == '\'' {
			if !inWord {
				inWord = true
				word.Reset()
			}
			word.WriteRune(unicode.ToLower(r))
		} else {
			if inWord {
				w := word.String()
				// Handle apostrophes at beginning and end
				if len(w) > 2 && w[0] == '\'' && w[len(w)-1] == '\'' {
					w = w[1 : len(w)-1]
				}
				if w != "" && w != "'" {
					result[w]++
				}
				inWord = false
			}
		}
	}
	
	// Handle last word if phrase doesn't end with delimiter
	if inWord {
		w := word.String()
		if len(w) > 2 && w[0] == '\'' && w[len(w)-1] == '\'' {
			w = w[1 : len(w)-1]
		}
		if w != "" && w != "'" {
			result[w]++
		}
	}
	
	return result
}