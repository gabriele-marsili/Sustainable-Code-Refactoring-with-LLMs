package techpalace

import (
	"strings"
)

// WelcomeMessage returns a welcome message for the customer.
func WelcomeMessage(customer string) string {
	return "Welcome to the Tech Palace, " + strings.ToUpper(customer)
}

// ReturnMultiple returns a string containing the given character repeated num times.
func ReturnMultiple(char string, num int) string {
	if num <= 0 {
		return ""
	}
	var sb strings.Builder
	sb.Grow(num)
	for i := 0; i < num; i++ {
		sb.WriteString(char)
	}
	return sb.String()
}

// AddBorder adds a border to a welcome message.
func AddBorder(welcomeMsg string, numStarsPerLine int) string {
	border := ReturnMultiple("*", numStarsPerLine)
	var sb strings.Builder
	sb.Grow(len(border) + len(welcomeMsg) + len(border) + 2) // Pre-allocate memory
	sb.WriteString(border)
	sb.WriteString("\n")
	sb.WriteString(welcomeMsg)
	sb.WriteString("\n")
	sb.WriteString(border)
	return sb.String()
}

// CleanupMessage cleans up an old marketing message.
func CleanupMessage(oldMsg string) string {
	s := strings.ReplaceAll(oldMsg, "*", "")
	return strings.TrimSpace(s)
}