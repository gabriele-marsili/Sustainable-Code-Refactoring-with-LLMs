package secret

// Calculate binary representation of integer
func binary(n uint) string {
	if n == 0 {
		return "0"
	}
	result := make([]byte, 0, 32) // Preallocate memory for efficiency
	for n > 0 {
		result = append([]byte{'0' + byte(n%2)}, result...)
		n /= 2
	}
	return string(result)
}

// Generate secret list from binary code
func generateList(binaryCode string) []string {
	actions := []string{"wink", "double blink", "close your eyes", "jump"}
	result := make([]string, 0, len(actions))
	for i := len(binaryCode) - 1; i >= 0; i-- {
		if binaryCode[i] == '1' && i < len(actions) {
			result = append(result, actions[len(binaryCode)-1-i])
		}
	}
	return result
}

// Reverse array and export
func reverseArray(input []string) []string {
	for i, j := 0, len(input)-1; i < j; i, j = i+1, j-1 {
		input[i], input[j] = input[j], input[i]
	}
	return input
}

func Handshake(code uint) []string {
	if code == 0 {
		return []string{}
	}
	binaryCode := binary(code)
	reverse := len(binaryCode) > 4 && binaryCode[0] == '1'
	if reverse {
		binaryCode = binaryCode[1:] // Trim to actual message bits
	}
	result := generateList(binaryCode)
	if reverse {
		reverseArray(result)
	}
	return result
}