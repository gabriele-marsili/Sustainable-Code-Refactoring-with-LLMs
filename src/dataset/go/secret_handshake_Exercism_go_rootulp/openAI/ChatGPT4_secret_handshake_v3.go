package secret

import (
	"strconv"
)

var operations = []string{"wink", "double blink", "close your eyes", "jump"}

func Handshake(code uint) (handshake []string) {
	binary := strconv.FormatInt(int64(code), 2)
	reverseFlag := false

	for i := 0; i < len(binary); i++ {
		if binary[len(binary)-1-i] == '1' {
			if i < len(operations) {
				handshake = append(handshake, operations[i])
			} else if i == len(operations) {
				reverseFlag = true
			}
		}
	}

	if reverseFlag {
		for i, j := 0, len(handshake)-1; i < j; i, j = i+1, j-1 {
			handshake[i], handshake[j] = handshake[j], handshake[i]
		}
	}

	return handshake
}