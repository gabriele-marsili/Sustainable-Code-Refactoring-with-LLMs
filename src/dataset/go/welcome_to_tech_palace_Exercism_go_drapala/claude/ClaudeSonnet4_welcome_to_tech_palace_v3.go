package techpalace

import (
    "strings"
)

// WelcomeMessage returns a welcome message for the customer.
func WelcomeMessage(customer string) string {
	return "Welcome to the Tech Palace, " + strings.ToUpper(customer)
}

func ReturnMultiple(char string, num int) string {
	if num <= 0 {
		return ""
	}
	return strings.Repeat(char, num)
}

// AddBorder adds a border to a welcome message.
func AddBorder(welcomeMsg string, numStarsPerLine int) string {
	border := ReturnMultiple("*", numStarsPerLine)
	return border + "\n" + welcomeMsg + "\n" + border
}

// CleanupMessage cleans up an old marketing message.
func CleanupMessage(oldMsg string) string {
	cleaned := strings.ReplaceAll(oldMsg, "*", "")
	return strings.TrimSpace(cleaned)
}