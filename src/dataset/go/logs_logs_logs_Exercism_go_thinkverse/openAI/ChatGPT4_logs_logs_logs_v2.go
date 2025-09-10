package logs

import (
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
		if app, exists := apps[char]; exists {
			return app
		}
	}
	return "default"
}

// Replace replaces all occurrences of old with new, returning the modified log
// to the caller.
func Replace(log string, oldRune, newRune rune) string {
	oldRuneStr := string(oldRune)
	newRuneStr := string(newRune)
	var result []rune
	for _, char := range log {
		if char == oldRune {
			result = append(result, newRune)
		} else {
			result = append(result, char)
		}
	}
	return string(result)
}

// WithinLimit determines whether or not the number of characters in log is
// within the limit.
func WithinLimit(log string, limit int) bool {
	count := 0
	for range log {
		count++
		if count > limit {
			return false
		}
	}
	return true
}