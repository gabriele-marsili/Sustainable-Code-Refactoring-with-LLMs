package railfence

func createZigZag(rails int, msgLength int) [][]bool {
	railSlice := make([][]bool, rails)
	for i := range railSlice {
		railSlice[i] = make([]bool, msgLength)
	}

	forward := true
	i := 0
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

	forward := true
	i := 0
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
	railLengths := make([]int, rails)
	index := 0

	for i, rail := range zigZag {
		for _, marked := range rail {
			if marked {
				railLengths[i]++
			}
		}
	}

	railSlice := make([][]rune, rails)
	for i, length := range railLengths {
		railSlice[i] = []rune(message[index : index+length])
		index += length
	}

	result := make([]rune, 0, len(message))
	forward := true
	i = 0
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