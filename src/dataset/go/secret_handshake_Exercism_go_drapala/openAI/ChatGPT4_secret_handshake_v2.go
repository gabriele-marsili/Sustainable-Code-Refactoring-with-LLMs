package secret

// Calculate binary representation of integer
func binary(n uint) string {
	if n == 0 {
		return "0"
	}
	result := make([]byte, 0, 32)
	for n > 0 {
		if n%2 == 0 {
			result = append(result, '0')
		} else {
			result = append(result, '1')
		}
		n /= 2
	}
	// Reverse the result to get the correct binary representation
	for i, j := 0, len(result)-1; i < j; i, j = i+1, j-1 {
		result[i], result[j] = result[j], result[i]
	}
	return string(result)
}

// Generate secret list from binary code
func generateList(binaryCode string) []string {
	actions := []string{"wink", "double blink", "close your eyes", "jump"}
	result := make([]string, 0, 4)
	for i := len(binaryCode) - 1; i >= 0; i-- {
		if binaryCode[i] == '1' && i < len(actions) {
			result = append(result, actions[len(binaryCode)-1-i])
		}
	}
	return result
}

// Reverse array and export
func reverseArray(input []string) {
	for i, j := 0, len(input)-1; i < j; i, j = i+1, j-1 {
		input[i], input[j] = input[j], input[i]
	}
}

func Handshake(code uint) []string {
	if code == 0 {
		return nil
	}
	// Calculate binary representation of integer
	binaryCode := binary(code)
	reverse := len(binaryCode) > 4 && binaryCode[0] == '1'
	if reverse {
		binaryCode = binaryCode[1:] // Trim to actual message bits
	}
	// Generate secret list from binary code
	result := generateList(binaryCode)
	// Reverse array if needed
	if reverse {
		reverseArray(result)
	}
	return result
}