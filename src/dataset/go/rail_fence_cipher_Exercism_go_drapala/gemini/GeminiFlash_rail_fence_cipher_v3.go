package railfence

func createZigZag(rails int, msgLength int) [][]byte {
	railSlice := make([][]byte, rails)
	for i := range railSlice {
		railSlice[i] = make([]byte, msgLength)
	}

	forward := true
	i := 0

	for n := 0; n < msgLength; n++ {
		railSlice[i][n] = '?'
		if forward {
			i++
		} else {
			i--
		}
		if i == rails-1 {
			forward = false
		} else if i == 0 {
			forward = true
		}
	}
	return railSlice
}

func Encode(message string, rails int) string {
	if rails <= 1 {
		return message
	}

	railSlice := make([]string, rails)
	forward := true
	i := 0

	for _, c := range message {
		railSlice[i] += string(c)
		if forward {
			i++
		} else {
			i--
		}
		if i == rails-1 {
			forward = false
		} else if i == 0 {
			forward = true
		}
	}

	result := ""
	for _, rail := range railSlice {
		result += rail
	}
	return result
}

func Decode(message string, rails int) string {
	if rails <= 1 {
		return message
	}

	railSlice := createZigZag(rails, len(message))

	i := 0
	for _, rail := range railSlice {
		for n, c := range rail {
			if c == '?' {
				rail[n] = message[i]
				i++
			}
		}
	}

	result := make([]byte, len(message))
	i = 0
	forward := true

	for x := 0; x < len(message); x++ {
		result[x] = railSlice[i][x]
		if forward {
			i++
		} else {
			i--
		}
		if i == rails-1 {
			forward = false
		} else if i == 0 {
			forward = true
		}
	}
	return string(result)
}