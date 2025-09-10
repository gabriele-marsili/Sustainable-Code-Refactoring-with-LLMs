package techpalace

import (
	"strings"
	"unsafe"
)

// WelcomeMessage returns a welcome message for the customer.
func WelcomeMessage(customer string) string {
	upperCustomer := strings.ToUpper(customer)
	return "Welcome to the Tech Palace, " + upperCustomer
}

// AddBorder adds a border to a welcome message.
func AddBorder(welcomeMsg string, numStarsPerLine int) string {
	border := getBorder(numStarsPerLine)
	sb := strings.Builder{}
	sb.Grow(len(border) + len(welcomeMsg) + len(border) + 2)
	sb.WriteString(border)
	sb.WriteString("\n")
	sb.WriteString(welcomeMsg)
	sb.WriteString("\n")
	sb.WriteString(border)
	return sb.String()
}

// CleanupMessage cleans up an old marketing message.
func CleanupMessage(oldMsg string) string {
	index := strings.IndexByte(oldMsg, '\n')
	if index == -1 {
		return ""
	}

	start := index + 1
	end := len(oldMsg)

	// Find the start of the actual message by skipping leading '*' and spaces
	for start < end && (oldMsg[start] == '*' || oldMsg[start] == ' ') {
		start++
	}

	// Find the end of the actual message by skipping trailing '*' and spaces
	for end > start && (oldMsg[end-1] == '*' || oldMsg[end-1] == ' ') {
		end--
	}

	// Extract the cleaned message using string slicing
	return oldMsg[start:end]
}

var borderCache = make(map[int]string)

func getBorder(numStarsPerLine int) string {
	if border, ok := borderCache[numStarsPerLine]; ok {
		return border
	}

	b := strings.Repeat("*", numStarsPerLine)
	borderCache[numStarsPerLine] = b
	return b
}

func stringToBytes(s string) []byte {
	return *(*[]byte)(unsafe.Pointer(
		&struct {
			string
			Cap int
		}{s, len(s)}))
}

func bytesToString(b []byte) string {
	return *(*string)(unsafe.Pointer(&b))
}