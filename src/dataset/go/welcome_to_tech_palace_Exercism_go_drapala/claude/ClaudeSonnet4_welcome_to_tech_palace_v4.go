package techpalace

import (
    "fmt"
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
	var builder strings.Builder
	builder.Grow(len(border)*2 + len(welcomeMsg) + 2)
	builder.WriteString(border)
	builder.WriteByte('\n')
	builder.WriteString(welcomeMsg)
	builder.WriteByte('\n')
	builder.WriteString(border)
	s := builder.String()
	fmt.Println(s)
	return s
}

// CleanupMessage cleans up an old marketing message.
func CleanupMessage(oldMsg string) string {
	fmt.Println("Old message:")
	fmt.Println(oldMsg)
	fmt.Println("New message:")
	s := strings.ReplaceAll(oldMsg, "*", "")
	fmt.Println(s)
	s = strings.TrimSpace(s)
	fmt.Println(s)
	return s
}