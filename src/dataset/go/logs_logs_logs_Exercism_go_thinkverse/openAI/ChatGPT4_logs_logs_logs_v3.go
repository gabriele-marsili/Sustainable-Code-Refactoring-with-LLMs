package logs

import (
	"strings"
	"unicode/utf8"
)

var apps = map[rune]string{
	'❗': "recommendation",
	'🔍': "search",
	'☀': "weather",
}

func Application(log string) string {
	for _, char := range log {
		if app, exists := apps[char]; exists {
			return app
		}
	}
	return "default"
}

func Replace(log string, oldRune, newRune rune) string {
	if oldRune == newRune {
		return log
	}
	var sb strings.Builder
	sb.Grow(len(log))
	for _, char := range log {
		if char == oldRune {
			sb.WriteRune(newRune)
		} else {
			sb.WriteRune(char)
		}
	}
	return sb.String()
}

func WithinLimit(log string, limit int) bool {
	if limit < 0 {
		return false
	}
	count := 0
	for range log {
		count++
		if count > limit {
			return false
		}
	}
	return true
}