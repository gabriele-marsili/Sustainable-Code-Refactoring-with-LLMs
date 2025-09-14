package techpalace

import (
    "strings"
)

// WelcomeMessage returns a welcome message for the customer.
func WelcomeMessage(customer string) string {
	return "Welcome to the Tech Palace, " + strings.ToUpper(customer)
}

func ReturnMultiple(char string, num int) string {
	return strings.Repeat(char, num)
}

// AddBorder adds a border to a welcome message.
func AddBorder(welcomeMsg string, numStarsPerLine int) string {
	border := strings.Repeat("*", numStarsPerLine)
	var sb strings.Builder
	sb.Grow(len(border)*2 + len(welcomeMsg) + 2)
	sb.WriteString(border)
	sb.WriteByte('\n')
	sb.WriteString(welcomeMsg)
	sb.WriteByte('\n')
	sb.WriteString(border)
	return sb.String()
}

// CleanupMessage cleans up an old marketing message.
func CleanupMessage(oldMsg string) string {
	s := strings.ReplaceAll(oldMsg, "*", "")
	return strings.TrimSpace(s)
}