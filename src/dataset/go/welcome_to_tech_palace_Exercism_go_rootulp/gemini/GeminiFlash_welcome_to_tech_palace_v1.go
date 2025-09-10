package techpalace

import (
	"strings"
)

// WelcomeMessage returns a welcome message for the customer.
func WelcomeMessage(customer string) string {
	var sb strings.Builder
	sb.WriteString("Welcome to the Tech Palace, ")
	sb.WriteString(strings.ToUpper(customer))
	return sb.String()
}

// AddBorder adds a border to a welcome message.
func AddBorder(welcomeMsg string, numStarsPerLine int) string {
	border := strings.Repeat("*", numStarsPerLine)
	var sb strings.Builder
	sb.WriteString(border)
	sb.WriteString("\n")
	sb.WriteString(welcomeMsg)
	sb.WriteString("\n")
	sb.WriteString(border)
	return sb.String()
}

// CleanupMessage cleans up an old marketing message.
func CleanupMessage(oldMsg string) string {
	lines := strings.SplitN(oldMsg, "\n", 3)
	if len(lines) < 2 {
		return "" // Or handle the error as appropriate
	}
	return strings.Trim(lines[1], "* ")
}