package secret

func Handshake(code uint) []string {
	var strings []string

	if code&0x1 != 0 {
		strings = append(strings, "wink")
	}
	if code&0x2 != 0 {
		strings = append(strings, "double blink")
	}
	if code&0x4 != 0 {
		strings = append(strings, "close your eyes")
	}
	if code&0x8 != 0 {
		strings = append(strings, "jump")
	}

	if code&0x10 != 0 {
		for i, j := 0, len(strings)-1; i < j; i, j = i+1, j-1 {
			strings[i], strings[j] = strings[j], strings[i]
		}
	}

	return strings
}