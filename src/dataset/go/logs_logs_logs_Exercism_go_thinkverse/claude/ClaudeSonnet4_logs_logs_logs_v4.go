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
		if app, ok := apps[char]; ok {
			return app
		}
	}
	return "default"
}

func Replace(log string, oldRune, newRune rune) string {
	if !strings.ContainsRune(log, oldRune) {
		return log
	}
	
	var result strings.Builder
	result.Grow(len(log))
	
	for _, r := range log {
		if r == oldRune {
			result.WriteRune(newRune)
		} else {
			result.WriteRune(r)
		}
	}
	return result.String()
}

func WithinLimit(log string, limit int) bool {
	if limit < 0 {
		return false
	}
	if len(log) <= limit {
		return true
	}
	return utf8.RuneCountInString(log) <= limit
}