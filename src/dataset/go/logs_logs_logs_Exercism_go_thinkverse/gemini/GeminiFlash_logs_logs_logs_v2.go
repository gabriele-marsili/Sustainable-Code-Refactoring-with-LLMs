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
	for i := 0; i < len(log); {
		r, size := utf8.DecodeRuneInString(log[i:])
		if app, ok := apps[r]; ok {
			return app
		}
		i += size
	}

	return "default"
}

// Replace replaces all occurrences of old with new, returning the modified log
// to the caller.
func Replace(log string, oldRune, newRune rune) string {
	oldStr := string(oldRune)
	newStr := string(newRune)
	return strings.ReplaceAll(log, oldStr, newStr)
}

// WithinLimit determines whether or not the number of characters in log is
// within the limit.
func WithinLimit(log string, limit int) bool {
	return utf8.RuneCountInString(log) <= limit
}