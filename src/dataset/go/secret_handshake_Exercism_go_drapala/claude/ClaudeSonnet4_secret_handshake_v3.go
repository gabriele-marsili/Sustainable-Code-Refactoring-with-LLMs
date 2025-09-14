package secret

// Calculate binary representation of integer
func binary(n uint) string {
	if n == 0 {
		return "0"
	}
	
	bits := make([]byte, 0, 8)
	for n > 0 {
		bits = append(bits, byte('0'+n%2))
		n /= 2
	}
	
	for i, j := 0, len(bits)-1; i < j; i, j = i+1, j-1 {
		bits[i], bits[j] = bits[j], bits[i]
	}
	
	return string(bits)
}

// Generate secret list from binary code
func generateList(binaryCode string) []string {
	actions := []string{"wink", "double blink", "close your eyes", "jump"}
	result := make([]string, 0, 4)
	
	for i := len(binaryCode) - 1; i >= 0 && len(binaryCode)-1-i < 4; i-- {
		if binaryCode[i] == '1' {
			result = append(result, actions[len(binaryCode)-1-i])
		}
	}
	
	return result
}

// Reverse array and export
func reverseArray(input []string) []string {
	output := make([]string, len(input))
	for i := 0; i < len(input); i++ {
		output[i] = input[len(input)-1-i]
	}
	return output
}

func Handshake(code uint) []string {
	binaryCode := binary(code)
	reverse := len(binaryCode) >= 5 && binaryCode[0] == '1'
	
	if reverse {
		binaryCode = binaryCode[1:]
	}
	
	result := generateList(binaryCode)
	
	if reverse {
		result = reverseArray(result)
	}
	
	return result
}