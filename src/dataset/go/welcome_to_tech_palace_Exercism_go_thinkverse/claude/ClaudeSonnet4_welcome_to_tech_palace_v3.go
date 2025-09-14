package techpalace

import "strings"

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
	
	for i := 0; i < numStarsPerLine; i++ {
		sb.WriteByte('*')
	}
	sb.WriteByte('\n')
	sb.WriteString(welcomeMsg)
	sb.WriteByte('\n')
	for i := 0; i < numStarsPerLine; i++ {
		sb.WriteByte('*')
	}
	
	return sb.String()
}

// CleanupMessage cleans up an old marketing message.
func CleanupMessage(oldMsg string) string {
	if oldMsg == "" {
		return ""
	}
	
	var sb strings.Builder
	sb.Grow(len(oldMsg))
	
	start := 0
	end := len(oldMsg) - 1
	
	// Trim leading whitespace
	for start <= end && (oldMsg[start] == ' ' || oldMsg[start] == '\t' || oldMsg[start] == '\n' || oldMsg[start] == '\r') {
		start++
	}
	
	// Trim trailing whitespace
	for end >= start && (oldMsg[end] == ' ' || oldMsg[end] == '\t' || oldMsg[end] == '\n' || oldMsg[end] == '\r') {
		end--
	}
	
	// Copy non-asterisk characters
	for i := start; i <= end; i++ {
		if oldMsg[i] != '*' {
			sb.WriteByte(oldMsg[i])
		}
	}
	
	return sb.String()
}