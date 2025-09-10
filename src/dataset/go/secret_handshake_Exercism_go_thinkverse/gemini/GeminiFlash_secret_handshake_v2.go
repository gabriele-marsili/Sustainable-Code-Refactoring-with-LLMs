package secret

func Handshake(code uint) []string {
	var result []string

	if code&0x1 != 0 {
		result = append(result, "wink")
	}
	if code&0x2 != 0 {
		result = append(result, "double blink")
	}
	if code&0x4 != 0 {
		result = append(result, "close your eyes")
	}
	if code&0x8 != 0 {
		result = append(result, "jump")
	}

	if code&0x10 != 0 {
		for i, j := 0, len(result)-1; i < j; i, j = i+1, j-1 {
			result[i], result[j] = result[j], result[i]
		}
	}

	return result
}