package raindrops

import (
	"strconv"
)

func Convert(number int) string {
	divisibleBy3 := number%3 == 0
	divisibleBy5 := number%5 == 0
	divisibleBy7 := number%7 == 0

	if !divisibleBy3 && !divisibleBy5 && !divisibleBy7 {
		return strconv.Itoa(number)
	}

	capacity := 0
	if divisibleBy3 {
		capacity += 5
	}
	if divisibleBy5 {
		capacity += 5
	}
	if divisibleBy7 {
		capacity += 5
	}

	result := make([]byte, 0, capacity)

	if divisibleBy3 {
		result = append(result, "Pling"...)
	}
	if divisibleBy5 {
		result = append(result, "Plang"...)
	}
	if divisibleBy7 {
		result = append(result, "Plong"...)
	}

	return string(result)
}
