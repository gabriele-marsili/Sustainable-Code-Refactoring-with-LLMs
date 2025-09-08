package railfence

func createZigZag(rails int, msgLength int) [][]string {
	rail_slice := make([][]string, rails)
	for i := range rail_slice {
		rail_slice[i] = make([]string, msgLength)
	}

	i, forward := 0, true
	for n := 0; n < msgLength; n++ {
		rail_slice[i][n] = "?"
		if forward {
			i++
			if i == rails-1 {
				forward = false
			}
		} else {
			i--
			if i == 0 {
				forward = true
			}
		}
	}
	return rail_slice
}

func railZigger(i *int, forward *bool, rails int) {
	if *forward {
		*i++
		if *i == rails-1 {
			*forward = false
		}
	} else {
		*i--
		if *i == 0 {
			*forward = true
		}
	}
}

func Encode(message string, rails int) string {
	rail_slice := make([][]rune, rails)
	for i := range rail_slice {
		rail_slice[i] = make([]rune, 0, len(message)/rails+1)
	}

	i, forward := 0, true
	for _, c := range message {
		rail_slice[i] = append(rail_slice[i], c)
		railZigger(&i, &forward, rails)
	}

	result := make([]rune, 0, len(message))
	for _, rail := range rail_slice {
		result = append(result, rail...)
	}
	return string(result)
}

func Decode(message string, rails int) string {
	rail_slice := createZigZag(rails, len(message))

	i := 0
	for _, rail := range rail_slice {
		for n := range rail {
			if rail[n] == "?" {
				rail[n] = string(message[i])
				i++
			}
		}
	}

	result := make([]rune, 0, len(message))
	i, forward := 0, true
	for x := 0; x < len(message); x++ {
		result = append(result, rune(rail_slice[i][x][0]))
		railZigger(&i, &forward, rails)
	}
	return string(result)
}