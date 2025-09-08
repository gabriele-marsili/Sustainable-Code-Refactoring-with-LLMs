package railfence

// Creates ZigZag pattern in a slice used for decoding
func createZigZag(rails int, msgLength int) [][]string {
	rail_slice := make([][]string, rails)

	// initialize rails of appropriate lengths
	for i := 0; i < rails; i++ {
		rail_slice[i] = make([]string, msgLength)
	}

	forward := true // Tracking direction
	i := 0          // Tracking rail number

	for n := 0; n < msgLength; n++ {
		rail_slice[i][n] = "?"
		railZigger(&i, &forward, rails)
	}
	return rail_slice
}

// railZigger implements the novel rail switching logic
// Is a function to avoid code duplication
func railZigger(i *int, forward *bool, rails int) {
	// Shift i
	if *forward {
		*i++
	} else {
		*i--
	}
	// Change direction at end of rails
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

	i := 0          // Tracking rail number
	forward := true // Tracking direction
	rail_slice := make([][]byte, rails) // Use byte slices for better performance
	
	for _, c := range []byte(message) { // Convert to bytes once
		rail_slice[i] = append(rail_slice[i], c)
		railZigger(&i, &forward, rails)
	}
	
	// Pre-allocate result slice with known capacity
	result := make([]byte, 0, len(message))
	for _, rail := range rail_slice {
		result = append(result, rail...)
	}
	return string(result)
}

func Decode(message string, rails int) string {
	if rails <= 1 || len(message) <= 1 {
		return message
	}

	msgBytes := []byte(message)
	rail_slice := make([][]byte, rails)

	// Pre-allocate rails with known capacity
	for i := 0; i < rails; i++ {
		rail_slice[i] = make([]byte, len(message))
	}

	// Create zigzag pattern using bytes
	forward := true
	railIdx := 0
	for n := 0; n < len(message); n++ {
		rail_slice[railIdx][n] = '?'
		railZigger(&railIdx, &forward, rails)
	}

	// Replace "?" per rail with message
	msgIdx := 0
	for railNum := range rail_slice {
		for n := range rail_slice[railNum] {
			if rail_slice[railNum][n] == '?' {
				rail_slice[railNum][n] = msgBytes[msgIdx]
				msgIdx++
			}
		}
	}

	// Get back the string
	result := make([]byte, len(message))
	railIdx = 0
	forward = true
	for x := 0; x < len(message); x++ {
		result[x] = rail_slice[railIdx][x]
		railZigger(&railIdx, &forward, rails)
	}
	return string(result)
}