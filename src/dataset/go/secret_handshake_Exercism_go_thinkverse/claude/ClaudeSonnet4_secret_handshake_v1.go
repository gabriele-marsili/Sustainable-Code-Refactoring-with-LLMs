package secret

func Handshake(code uint) []string {
	if code == 0 {
		return nil
	}

	actions := [4]string{"wink", "double blink", "close your eyes", "jump"}
	result := make([]string, 0, 4)

	for i := 0; i < 4; i++ {
		if code&(1<<i) != 0 {
			result = append(result, actions[i])
		}
	}

	if code&0b10000 != 0 {
		for i, j := 0, len(result)-1; i < j; i, j = i+1, j-1 {
			result[i], result[j] = result[j], result[i]
		}
	}

	return result
}