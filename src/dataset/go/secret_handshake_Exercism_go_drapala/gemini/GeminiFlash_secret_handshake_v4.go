package secret

// Handshake generates a secret handshake based on the input code.
func Handshake(code uint) []string {
	result := make([]string, 0, 4)
	if code&1 != 0 {
		result = append(result, "wink")
	}
	if code&2 != 0 {
		result = append(result, "double blink")
	}
	if code&4 != 0 {
		result = append(result, "close your eyes")
	}
	if code&8 != 0 {
		result = append(result, "jump")
	}

	if code&16 != 0 {
		// Reverse the slice in-place
		for i, j := 0, len(result)-1; i < j; i, j = i+1, j-1 {
			result[i], result[j] = result[j], result[i]
		}
	}

	return result
}