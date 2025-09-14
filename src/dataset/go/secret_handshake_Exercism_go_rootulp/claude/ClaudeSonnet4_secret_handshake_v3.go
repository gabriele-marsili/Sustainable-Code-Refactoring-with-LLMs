package secret

var operations = []string{"wink", "double blink", "close your eyes", "jump"}

func Handshake(code uint) (handshake []string) {
	if code == 0 {
		return handshake
	}
	
	for i := 0; i < 4 && code > 0; i++ {
		if code&1 == 1 {
			handshake = append(handshake, operations[i])
		}
		code >>= 1
	}
	
	if code&1 == 1 {
		reverseSlice(handshake)
	}
	
	return handshake
}

func reverse(input string) (result string) {
	runes := []rune(input)
	for i, j := 0, len(runes)-1; i < j; i, j = i+1, j-1 {
		runes[i], runes[j] = runes[j], runes[i]
	}
	return string(runes)
}

func reverseSlice(input []string) (result []string) {
	for i, j := 0, len(input)-1; i < j; i, j = i+1, j-1 {
		input[i], input[j] = input[j], input[i]
	}
	return input
}