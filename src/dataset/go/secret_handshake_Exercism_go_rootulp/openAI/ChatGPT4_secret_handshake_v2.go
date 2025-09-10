package secret

var operations = []string{"wink", "double blink", "close your eyes", "jump"}

func Handshake(code uint) []string {
	var handshake []string
	for i := 0; i < 4; i++ {
		if code&(1<<i) != 0 {
			handshake = append(handshake, operations[i])
		}
	}
	if code&(1<<4) != 0 {
		reverseSlice(handshake)
	}
	return handshake
}

func reverseSlice(input []string) {
	for i, j := 0, len(input)-1; i < j; i, j = i+1, j-1 {
		input[i], input[j] = input[j], input[i]
	}
}