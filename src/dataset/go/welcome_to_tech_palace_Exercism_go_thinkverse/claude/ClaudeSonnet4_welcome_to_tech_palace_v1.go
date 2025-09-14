package techpalace

import "strings"

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
	var builder strings.Builder
	builder.Grow(len(welcomeMsg) + 2*numStarsPerLine + 2) // Pre-allocate capacity
	
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
	if oldMsg == "" {
		return ""
	}
	
	var builder strings.Builder
	builder.Grow(len(oldMsg)) // Pre-allocate capacity
	
	for _, char := range oldMsg {
		if char != '*' {
			builder.WriteRune(char)
		}
	}
	
	return strings.TrimSpace(builder.String())
}