package secret

var operations = []string{"wink", "double blink", "close your eyes", "jump"}

func Handshake(code uint) (handshake []string) {
	for i := 0; i < 4; i++ {
		if code&(1<<i) != 0 {
			handshake = append(handshake, operations[i])
		}
	}
	
	if code&16 != 0 {
		reverseSliceInPlace(handshake)
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
	result = make([]string, len(input))
	for i, v := range input {
		result[len(input)-1-i] = v
	}
	return result
}

func reverseSliceInPlace(slice []string) {
	for i, j := 0, len(slice)-1; i < j; i, j = i+1, j-1 {
		slice[i], slice[j] = slice[j], slice[i]
	}
}