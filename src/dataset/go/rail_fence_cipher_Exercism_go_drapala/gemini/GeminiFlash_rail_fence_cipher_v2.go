package railfence

func Encode(message string, rails int) string {
	if rails <= 1 {
		return message
	}

	rail_slice := make([]string, rails)
	railIndex := 0
	direction := 1 // 1 for down, -1 for up

	for _, char := range message {
		rail_slice[railIndex] += string(char)
		railIndex += direction

		if railIndex == rails {
			railIndex = rails - 2
			direction = -1
		} else if railIndex == -1 {
			railIndex = 1
			direction = 1
		}
	}

	result := ""
	for _, rail := range rail_slice {
		result += rail
	}
	return result
}

func Decode(message string, rails int) string {
	if rails <= 1 {
		return message
	}

	msgLen := len(message)
	rail_lengths := make([]int, rails)
	railIndex := 0
	direction := 1

	for i := 0; i < msgLen; i++ {
		rail_lengths[railIndex]++
		railIndex += direction

		if railIndex == rails {
			railIndex = rails - 2
			direction = -1
		} else if railIndex == -1 {
			railIndex = 1
			direction = 1
		}
	}

	rail_strings := make([]string, rails)
	start := 0
	for i := 0; i < rails; i++ {
		rail_strings[i] = message[start : start+rail_lengths[i]]
		start += rail_lengths[i]
	}

	result := make([]byte, msgLen)
	railIndex = 0
	direction = 1
	railPositions := make([]int, rails)

	for i := 0; i < msgLen; i++ {
		result[i] = rail_strings[railIndex][railPositions[railIndex]]
		railPositions[railIndex]++

		railIndex += direction
		if railIndex == rails {
			railIndex = rails - 2
			direction = -1
		} else if railIndex == -1 {
			railIndex = 1
			direction = 1
		}
	}

	return string(result)
}