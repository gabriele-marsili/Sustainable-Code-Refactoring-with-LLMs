package railfence

// Creates ZigZag pattern in a slice used for decoding
func createZigZag(rails int, msgLength int) [][]bool {
	rail_slice := make([][]bool, rails)

	// initialize rails of appropriate lengths
	for i := 0; i < rails; i++ {
		rail_slice[i] = make([]bool, msgLength)
	}

	i := 0
	direction := 1

	for n := 0; n < msgLength; n++ {
		rail_slice[i][n] = true
		i += direction
		if i == rails-1 || i == 0 {
			direction = -direction
		}
	}
	return rail_slice
}

func Encode(message string, rails int) string {
	if rails <= 1 {
		return message
	}

	rail_slice := make([][]byte, rails)
	for i := range rail_slice {
		rail_slice[i] = make([]byte, 0, len(message)/rails+1)
	}

	i := 0
	direction := 1

	for _, c := range []byte(message) {
		rail_slice[i] = append(rail_slice[i], c)
		i += direction
		if i == rails-1 || i == 0 {
			direction = -direction
		}
	}

	result := make([]byte, 0, len(message))
	for _, rail := range rail_slice {
		result = append(result, rail...)
	}
	return string(result)
}

func Decode(message string, rails int) string {
	if rails <= 1 {
		return message
	}

	msgBytes := []byte(message)
	rail_slice := createZigZag(rails, len(message))

	// Replace true positions per rail with message characters
	msgIndex := 0
	decodedRails := make([][]byte, rails)
	for i := range decodedRails {
		decodedRails[i] = make([]byte, len(message))
	}

	for railIdx, rail := range rail_slice {
		for pos, hasChar := range rail {
			if hasChar {
				decodedRails[railIdx][pos] = msgBytes[msgIndex]
				msgIndex++
			}
		}
	}

	// Reconstruct the string
	result := make([]byte, 0, len(message))
	i := 0
	direction := 1

	for x := 0; x < len(message); x++ {
		result = append(result, decodedRails[i][x])
		i += direction
		if i == rails-1 || i == 0 {
			direction = -direction
		}
	}
	return string(result)
}