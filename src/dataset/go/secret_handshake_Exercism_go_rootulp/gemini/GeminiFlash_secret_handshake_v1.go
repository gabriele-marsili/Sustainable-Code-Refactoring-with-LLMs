package secret

var operations = []string{"wink", "double blink", "close your eyes", "jump"}

func Handshake(code uint) []string {
	handshake := make([]string, 0, 4)
	for i := 0; i < len(operations); i++ {
		if code&(1<<i) != 0 {
			handshake = append(handshake, operations[i])
		}
	}

	if code&(1<<4) != 0 {
		reverseSlice(handshake)
	}

	return handshake
}

func reverseSlice(s []string) {
	for i, j := 0, len(s)-1; i < j; i, j = i+1, j-1 {
		s[i], s[j] = s[j], s[i]
	}
}