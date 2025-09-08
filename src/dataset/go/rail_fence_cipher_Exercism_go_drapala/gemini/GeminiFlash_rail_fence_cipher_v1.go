package railfence

func Encode(message string, rails int) string {
	if rails <= 1 {
		return message
	}

	rail_slice := make([]string, rails)
	rail := 0
	direction := 1 // 1 for down, -1 for up

	for i := 0; i < len(message); i++ {
		rail_slice[rail] += string(message[i])
		rail += direction

		if rail == rails {
			rail = rails - 2
			direction = -1
		} else if rail < 0 {
			rail = 1
			direction = 1
		}
	}

	result := ""
	for _, r := range rail_slice {
		result += r
	}
	return result
}

func Decode(message string, rails int) string {
	if rails <= 1 {
		return message
	}

	msgLen := len(message)
	rail_lengths := make([]int, rails)
	rail := 0
	direction := 1

	for i := 0; i < msgLen; i++ {
		rail_lengths[rail]++
		rail += direction

		if rail == rails {
			rail = rails - 2
			direction = -1
		} else if rail < 0 {
			rail = 1
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
	rail = 0
	direction = 1
	rail_indices := make([]int, rails)

	for i := 0; i < msgLen; i++ {
		result[i] = rail_strings[rail][rail_indices[rail]]
		rail_indices[rail]++
		rail += direction

		if rail == rails {
			rail = rails - 2
			direction = -1
		} else if rail < 0 {
			rail = 1
			direction = 1
		}
	}

	return string(result)
}