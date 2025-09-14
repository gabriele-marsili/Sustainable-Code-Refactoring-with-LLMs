package logs

import (
	"strings"
	"unicode/utf8"
)

// apps is a map of approved applications and their identifiers.
var apps = map[rune]string{
	'❗': "recommendation",
	'🔍': "search",
	'☀': "weather",
}

// Application identifies the application emitting the given log.
func Application(log string) string {
	for _, char := range log {
		if app, ok := apps[char]; ok {
			return app
		}
	}

	return "default"
}

// Replace replaces all occurrences of old with new, returning the modified log
// to the caller.
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

// WithinLimit determines whether or not the number of characters in log is
// within the limit.
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