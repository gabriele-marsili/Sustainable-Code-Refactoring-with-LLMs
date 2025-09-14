package logs

import (
	"strings"
	"unicode/utf8"
)

var (
	recommendation = rune('❗')
	search         = rune('🔍')
	weather        = rune('☀')
)

func Application(log string) string {
	for _, r := range log {
		switch r {
		case recommendation:
			return "recommendation"
		case search:
			return "search"
		case weather:
			return "weather"
		}
	}
	return "default"
}

func Replace(log string, oldRune, newRune rune) string {
	return strings.Map(func(r rune) rune {
		if r == oldRune {
			return newRune
		}
		return r
	}, log)
}

func WithinLimit(log string, limit int) bool {
	return utf8.RuneCountInString(log) <= limit
}