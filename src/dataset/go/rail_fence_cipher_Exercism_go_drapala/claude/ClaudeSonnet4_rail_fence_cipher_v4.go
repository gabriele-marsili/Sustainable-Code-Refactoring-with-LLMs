package railfence

func createZigZag(rails int, msgLength int) [][]string {
	railSlice := make([][]string, rails)
	for i := range railSlice {
		railSlice[i] = make([]string, msgLength)
	}

	rail := 0
	direction := 1

	for n := 0; n < msgLength; n++ {
		railSlice[rail][n] = "?"
		rail += direction
		if rail == rails-1 || rail == 0 {
			direction = -direction
		}
	}
	return railSlice
}

func railZigger(i *int, forward *bool, rails int) {
	if *forward {
		*i++
	} else {
		*i--
	}
	if *i == rails-1 {
		*forward = false
	} else if *i == 0 {
		*forward = true
	}
}

func Encode(message string, rails int) string {
	if rails <= 1 || len(message) <= 1 {
		return message
	}

	railSlice := make([][]byte, rails)
	rail := 0
	direction := 1

	for i := 0; i < len(message); i++ {
		railSlice[rail] = append(railSlice[rail], message[i])
		rail += direction
		if rail == rails-1 || rail == 0 {
			direction = -direction
		}
	}

	result := make([]byte, 0, len(message))
	for _, r := range railSlice {
		result = append(result, r...)
	}
	return string(result)
}

func Decode(message string, rails int) string {
	if rails <= 1 || len(message) <= 1 {
		return message
	}

	railSlice := createZigZag(rails, len(message))

	msgIndex := 0
	for _, rail := range railSlice {
		for n, c := range rail {
			if c == "?" {
				rail[n] = string(message[msgIndex])
				msgIndex++
			}
		}
	}

	result := make([]byte, 0, len(message))
	rail := 0
	direction := 1

	for x := 0; x < len(message); x++ {
		result = append(result, railSlice[rail][x][0])
		rail += direction
		if rail == rails-1 || rail == 0 {
			direction = -direction
		}
	}
	return string(result)
}