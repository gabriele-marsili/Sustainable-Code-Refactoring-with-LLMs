package techpalace

import (
	"strings"
	"unicode"
)

// WelcomeMessage returns a welcome message for the customer.
func WelcomeMessage(customer string) string {
	var sb strings.Builder
	sb.Grow(26 + len(customer))
	sb.WriteString("Welcome to the Tech Palace, ")
	for _, r := range customer {
		sb.WriteRune(unicode.ToUpper(r))
	}
	return sb.String()
}

// AddBorder adds a border to a welcome message.
func AddBorder(welcomeMsg string, numStarsPerLine int) string {
	var sb strings.Builder
	totalLen := numStarsPerLine*2 + len(welcomeMsg) + 2
	sb.Grow(totalLen)
	
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
	var sb strings.Builder
	sb.Grow(len(oldMsg))
	
	start := 0
	end := len(oldMsg)
	
	for start < end && (oldMsg[start] == ' ' || oldMsg[start] == '\t' || oldMsg[start] == '\n' || oldMsg[start] == '\r') {
		start++
	}
	
	for end > start && (oldMsg[end-1] == ' ' || oldMsg[end-1] == '\t' || oldMsg[end-1] == '\n' || oldMsg[end-1] == '\r') {
		end--
	}
	
	for i := start; i < end; i++ {
		if oldMsg[i] != '*' {
			sb.WriteByte(oldMsg[i])
		}
	}
	
	return sb.String()
}