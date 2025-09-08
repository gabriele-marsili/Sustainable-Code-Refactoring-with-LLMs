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

	msgLength := len(message)
	railSlice := createZigZag(rails, msgLength)

	i := 0
	for r := 0; r < rails; r++ {
		for n := 0; n < msgLength; n++ {
			if railSlice[r][n] == '?' {
				railSlice[r][n] = message[i]
				i++
			}
		}
	}

	result := make([]byte, msgLength)
	i = 0
	forward := true
	railIndex := 0

	for x := 0; x < msgLength; x++ {
		result[x] = railSlice[railIndex][x]
		if forward {
			railIndex++
		} else {
			railIndex--
		}

		if railIndex == rails-1 {
			forward = false
		} else if railIndex == 0 {
			forward = true
		}
	}
	return string(result)
}