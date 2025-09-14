package techpalace

import (
	"strings"
)

// WelcomeMessage returns a welcome message for the customer.
func WelcomeMessage(customer string) string {
	var builder strings.Builder
	builder.Grow(25 + len(customer))
	builder.WriteString("Welcome to the Tech Palace, ")
	builder.WriteString(strings.ToUpper(customer))
	return builder.String()
}

// AddBorder adds a border to a welcome message.
func AddBorder(welcomeMsg string, numStarsPerLine int) string {
	var builder strings.Builder
	builder.Grow(len(welcomeMsg) + (numStarsPerLine * 2) + 2)
	
	for i := 0; i < numStarsPerLine; i++ {
		builder.WriteByte('*')
	}
	builder.WriteByte('\n')
	builder.WriteString(welcomeMsg)
	builder.WriteByte('\n')
	for i := 0; i < numStarsPerLine; i++ {
		builder.WriteByte('*')
	}
	
	return builder.String()
}

// CleanupMessage cleans up an old marketing message.
func CleanupMessage(oldMsg string) string {
	start := strings.Index(oldMsg, "\n")
	if start == -1 {
		return strings.Trim(oldMsg, "* ")
	}
	start++
	
	end := strings.Index(oldMsg[start:], "\n")
	if end == -1 {
		return strings.Trim(oldMsg[start:], "* ")
	}
	
	return strings.Trim(oldMsg[start:start+end], "* ")
}

func border(numStarsPerLine int) string {
	if numStarsPerLine <= 0 {
		return ""
	}
	var builder strings.Builder
	builder.Grow(numStarsPerLine)
	for i := 0; i < numStarsPerLine; i++ {
		builder.WriteByte('*')
	}
	return builder.String()
}