package secret

func binary(n uint) string {
	if n == 0 {
		return "0"
	}
	result := make([]byte, 0, 32)
	for n > 0 {
		result = append([]byte{'0' + byte(n%2)}, result...)
		n /= 2
	}
	return string(result)
}

func generateList(binaryCode string) []string {
	actions := []string{"wink", "double blink", "close your eyes", "jump"}
	result := make([]string, 0, 4)
	for i := len(binaryCode) - 1; i >= 0; i-- {
		if binaryCode[i] == '1' && i < len(actions) {
			result = append(result, actions[len(binaryCode)-1-i])
		}
	}
	return result
}

func reverseArray(input []string) []string {
	for i, j := 0, len(input)-1; i < j; i, j = i+1, j-1 {
		input[i], input[j] = input[j], input[i]
	}
	return input
}

func Handshake(code uint) []string {
	binaryCode := binary(code)
	reverse := len(binaryCode) == 5
	if reverse {
		binaryCode = binaryCode[1:]
	}
	result := generateList(binaryCode)
	if reverse {
		result = reverseArray(result)
	}
	return result
}