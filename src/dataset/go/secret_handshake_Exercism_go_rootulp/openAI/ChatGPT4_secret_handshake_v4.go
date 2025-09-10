package secret

var operations = []string{"wink", "double blink", "close your eyes", "jump"}

func Handshake(code uint) []string {
	var handshake []string
	for i := 0; i < 5; i++ {
		if code&(1<<i) != 0 {
			if i < len(operations) {
				handshake = append(handshake, operations[i])
			} else {
				reverseSliceInPlace(handshake)
			}
		}
	}
	return handshake
}

func reverseSliceInPlace(input []string) {
	for i, j := 0, len(input)-1; i < j; i, j = i+1, j-1 {
		input[i], input[j] = input[j], input[i]
	}
}