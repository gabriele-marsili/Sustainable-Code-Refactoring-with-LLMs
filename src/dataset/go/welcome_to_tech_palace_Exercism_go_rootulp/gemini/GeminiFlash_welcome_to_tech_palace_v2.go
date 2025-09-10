package techpalace

import (
	"fmt"
	"strings"
	"unicode"
)

// WelcomeMessage returns a welcome message for the customer.
func WelcomeMessage(customer string) string {
	upperCustomer := strings.Map(func(r rune) rune {
		if unicode.IsLower(r) {
			return unicode.ToUpper(r)
		}
		return r
	}, customer)
	return "Welcome to the Tech Palace, " + upperCustomer
}

// AddBorder adds a border to a welcome message.
func AddBorder(welcomeMsg string, numStarsPerLine int) string {
	border := strings.Repeat("*", numStarsPerLine)
	return border + "\n" + welcomeMsg + "\n" + border
}

// CleanupMessage cleans up an old marketing message.
func CleanupMessage(oldMsg string) string {
	lines := strings.SplitN(oldMsg, "\n", 3)
	if len(lines) < 2 {
		return "" // Or handle the error as appropriate
	}
	trimmed := strings.Trim(lines[1], "* ")
	return trimmed
}