package techpalace

import (
	"fmt"
	"strings"
	"sync"
)

var borderCache sync.Map

// WelcomeMessage returns a welcome message for the customer.
func WelcomeMessage(customer string) string {
	var sb strings.Builder
	sb.WriteString("Welcome to the Tech Palace, ")
	sb.WriteString(strings.ToUpper(customer))
	return sb.String()
}

// AddBorder adds a border to a welcome message.
func AddBorder(welcomeMsg string, numStarsPerLine int) string {
	borderStr := getBorder(numStarsPerLine)
	var sb strings.Builder
	sb.WriteString(borderStr)
	sb.WriteString("\n")
	sb.WriteString(welcomeMsg)
	sb.WriteString("\n")
	sb.WriteString(borderStr)
	return sb.String()
}

// CleanupMessage cleans up an old marketing message.
func CleanupMessage(oldMsg string) string {
	idx := strings.Index(oldMsg, "\n")
	if idx == -1 {
		return strings.Trim(oldMsg, "* ")
	}

	start := idx + 1
	idx2 := strings.Index(oldMsg[start:], "\n")
	if idx2 == -1 {
		return strings.Trim(oldMsg[start:], "* ")
	}

	return strings.Trim(oldMsg[start:start+idx2], "* ")
}

func border(numStarsPerLine int) string {
	var sb strings.Builder
	for i := 0; i < numStarsPerLine; i++ {
		sb.WriteByte('*')
	}
	return sb.String()
}

func getBorder(numStarsPerLine int) string {
	if val, ok := borderCache.Load(numStarsPerLine); ok {
		return val.(string)
	}

	b := border(numStarsPerLine)
	borderCache.Store(numStarsPerLine, b)
	return b
}