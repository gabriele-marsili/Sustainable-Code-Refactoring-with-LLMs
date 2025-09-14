package secret

// Handshake generates a secret handshake based on the binary representation of the input code
func Handshake(code uint) []string {
	if code == 0 {
		return []string{}
	}
	
	actions := []string{"wink", "double blink", "close your eyes", "jump"}
	result := make([]string, 0, 4) // Pre-allocate with capacity
	
	// Process bits 0-3 for actions
	for i := 0; i < 4; i++ {
		if code&(1<<uint(i)) != 0 {
			result = append(result, actions[i])
		}
	}
	
	// Check bit 4 for reverse flag
	if code&16 != 0 { // 16 = 1<<4
		// Reverse in place
		for i, j := 0, len(result)-1; i < j; i, j = i+1, j-1 {
			result[i], result[j] = result[j], result[i]
		}
	}
	
	return result
}