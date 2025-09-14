package techpalace

import (
	"strings"
)

// WelcomeMessage returns a welcome message for the customer.
func WelcomeMessage(customer string) string {
	var sb strings.Builder
	sb.Grow(25 + len(customer)) // Pre-allocate capacity
	sb.WriteString("Welcome to the Tech Palace, ")
	sb.WriteString(strings.ToUpper(customer))
	return sb.String()
}

// AddBorder adds a border to a welcome message.
func AddBorder(welcomeMsg string, numStarsPerLine int) string {
	var sb strings.Builder
	sb.Grow(len(welcomeMsg) + 2*numStarsPerLine + 2) // Pre-allocate capacity
	
	// Write first border
	for i := 0; i < numStarsPerLine; i++ {
		sb.WriteByte('*')
	}
	sb.WriteByte('\n')
	sb.WriteString(welcomeMsg)
	sb.WriteByte('\n')
	// Write second border
	for i := 0; i < numStarsPerLine; i++ {
		sb.WriteByte('*')
	}
	
	return sb.String()
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