package secret

func Handshake(code uint) []string {
	actions := []string{"wink", "double blink", "close your eyes", "jump"}
	var result []string

	for i, action := range actions {
		if code&(1<<i) != 0 {
			result = append(result, action)
		}
	}

	if code&0b10000 != 0 {
		for i, j := 0, len(result)-1; i < j; i, j = i+1, j-1 {
			result[i], result[j] = result[j], result[i]
		}
	}

	return result
}