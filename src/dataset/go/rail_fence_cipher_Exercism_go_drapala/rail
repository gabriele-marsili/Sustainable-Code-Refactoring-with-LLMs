package railfence

func createZigZag(rails int, msgLength int) [][]bool {
	railSlice := make([][]bool, rails)
	for i := range railSlice {
		railSlice[i] = make([]bool, msgLength)
	}

	i, forward := 0, true
	for n := 0; n < msgLength; n++ {
		railSlice[i][n] = true
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
	return railSlice
}

func Encode(message string, rails int) string {
	railSlice := make([][]rune, rails)
	for i := range railSlice {
		railSlice[i] = make([]rune, 0, len(message)/rails+1)
	}

	i, forward := 0, true
	for _, c := range message {
		railSlice[i] = append(railSlice[i], c)
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

	result := make([]rune, 0, len(message))
	for _, rail := range railSlice {
		result = append(result, rail...)
	}
	return string(result)
}

func Decode(message string, rails int) string {
	zigZag := createZigZag(rails, len(message))
	railSlice := make([][]rune, rails)
	for i := range railSlice {
		railSlice[i] = make([]rune, 0, len(message)/rails+1)
	}

	idx := 0
	for i, rail := range zigZag {
		for j, marked := range rail {
			if marked {
				railSlice[i] = append(railSlice[i], rune(message[idx]))
				idx++
			}
		}
	}

	result := make([]rune, 0, len(message))
	i, forward := 0, true
	for x := 0; x < len(message); x++ {
		result = append(result, railSlice[i][0])
		railSlice[i] = railSlice[i][1:]
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
	return string(result)
}