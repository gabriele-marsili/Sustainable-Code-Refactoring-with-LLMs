package wordcount

import (
	"strings"
	"unicode"
)

type Frequency map[string]int

func isValidChar(r rune) bool {
	return unicode.IsLetter(r) || unicode.IsDigit(r) || r == '\'' || unicode.IsSpace(r)
}

func strip(s string) string {
	runes := []rune(s)
	j := 0
	for _, r := range runes {
		if isValidChar(r) {
			runes[j] = r
			j++
		}
	}
	return string(runes[:j])
}

func CleanWord(in string) string {
	if in == "" {
		return ""
	}
	
	out := strip(in)
	if len(out) == 0 {
		return ""
	}
	
	if len(out) >= 2 && out[0] == '\'' && out[len(out)-1] == '\'' {
		out = out[1 : len(out)-1]
	}
	
	return out
}

func WordCount(phrase string) Frequency {
	if phrase == "" {
		return make(Frequency)
	}
	
	result := make(Frequency)
	
	start := 0
	inWord := false
	
	for i, r := range phrase {
		if unicode.IsSpace(r) || r == ',' {
			if inWord {
				word := CleanWord(phrase[start:i])
				if word != "" {
					result[strings.ToLower(word)]++
				}
				inWord = false
			}
		} else {
			if !inWord {
				start = i
				inWord = true
			}
		}
	}
	
	if inWord {
		word := CleanWord(phrase[start:])
		if word != "" {
			result[strings.ToLower(word)]++
		}
	}
	
	return result
}