package secret

func Handshake(code uint) []string {
	strings := make([]string, 0, 4)

	if code&0b00001 != 0 {
		strings = append(strings, "wink")
	}
	if code&0b00010 != 0 {
		strings = append(strings, "double blink")
	}
	if code&0b00100 != 0 {
		strings = append(strings, "close your eyes")
	}
	if code&0b01000 != 0 {
		strings = append(strings, "jump")
	}
	if code&0b10000 != 0 {
		for i, j := 0, len(strings)-1; i < j; i, j = i+1, j-1 {
			strings[i], strings[j] = strings[j], strings[i]
		}
	}

	return strings
}