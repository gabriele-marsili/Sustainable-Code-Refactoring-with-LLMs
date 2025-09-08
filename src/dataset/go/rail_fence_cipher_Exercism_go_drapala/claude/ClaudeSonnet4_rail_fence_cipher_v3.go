package railfence

func createZigZag(rails int, msgLength int) [][]string {
	railSlice := make([][]string, rails)
	for i := range railSlice {
		railSlice[i] = make([]string, msgLength)
	}

	rail := 0
	direction := 1

	for pos := 0; pos < msgLength; pos++ {
		railSlice[rail][pos] = "?"
		rail += direction
		if rail == rails-1 || rail == 0 {
			direction = -direction
		}
	}
	return railSlice
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
	for _, railData := range railSlice {
		result = append(result, railData...)
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
		for pos, marker := range rail {
			if marker == "?" {
				rail[pos] = string(message[msgIndex])
				msgIndex++
			}
		}
	}

	result := make([]byte, 0, len(message))
	rail := 0
	direction := 1

	for pos := 0; pos < len(message); pos++ {
		result = append(result, railSlice[rail][pos][0])
		rail += direction
		if rail == rails-1 || rail == 0 {
			direction = -direction
		}
	}
	return string(result)
}