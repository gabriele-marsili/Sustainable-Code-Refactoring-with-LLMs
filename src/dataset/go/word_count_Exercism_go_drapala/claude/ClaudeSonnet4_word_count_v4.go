package wordcount

import (
	"strings"
	"unicode"
)

type Frequency map[string]int

func strip(s string) string {
	if len(s) == 0 {
		return s
	}
	
	result := make([]byte, 0, len(s))
	for i := 0; i < len(s); i++ {
		b := s[i]
		if (b >= 'a' && b <= 'z') ||
			(b >= 'A' && b <= 'Z') ||
			(b >= '0' && b <= '9') ||
			b == ' ' ||
			b == '\'' {
			result = append(result, b)
		}
	}
	return string(result)
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
	if len(phrase) == 0 {
		return make(Frequency)
	}
	
	result := make(Frequency)
	
	start := 0
	inWord := false
	
	for i, r := range phrase {
		isWordChar := unicode.IsLetter(r) || unicode.IsDigit(r) || r == '\''
		
		if isWordChar && !inWord {
			start = i
			inWord = true
		} else if !isWordChar && inWord {
			word := CleanWord(phrase[start:i])
			if word != "" {
				result[strings.ToLower(word)]++
			}
			inWord = false
		} else if r == ',' && inWord {
			word := CleanWord(phrase[start:i])
			if word != "" {
				result[strings.ToLower(word)]++
			}
			inWord = false
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