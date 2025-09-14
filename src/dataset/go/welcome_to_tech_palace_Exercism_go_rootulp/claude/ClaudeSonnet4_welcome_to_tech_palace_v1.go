package techpalace

import (
	"strings"
)

// WelcomeMessage returns a welcome message for the customer.
func WelcomeMessage(customer string) string {
	var builder strings.Builder
	builder.Grow(25 + len(customer)) // Pre-allocate capacity
	builder.WriteString("Welcome to the Tech Palace, ")
	builder.WriteString(strings.ToUpper(customer))
	return builder.String()
}

// AddBorder adds a border to a welcome message.
func AddBorder(welcomeMsg string, numStarsPerLine int) string {
	borderStr := border(numStarsPerLine)
	var builder strings.Builder
	builder.Grow(len(welcomeMsg) + 2*numStarsPerLine + 2) // Pre-allocate capacity
	builder.WriteString(borderStr)
	builder.WriteByte('\n')
	builder.WriteString(welcomeMsg)
	builder.WriteByte('\n')
	builder.WriteString(borderStr)
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
	return strings.Repeat("*", numStarsPerLine)
}