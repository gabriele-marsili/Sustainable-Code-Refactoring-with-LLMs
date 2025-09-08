package variablelengthquantity

import (
	"fmt"
)

// Returns the position of the highest set bit (1-based index).
func getMax1Bit(val uint32) int {
	if val == 0 {
		return -1
	}
	pos := 0
	for val > 0 {
		val >>= 1
		pos++
	}
	return pos - 1
}

// Returns the value of the nth bit of a 32-bit integer.
func getNthBit(val, n uint32) int {
	return int((val >> n) & 1)
}

// Reverse a slice in place.
func reverseSlice(input []byte) {
	for i, j := 0, len(input)-1; i < j; i, j = i+1, j-1 {
		input[i], input[j] = input[j], input[i]
	}
}

// Converts a single unsigned 32-bit integer to VLQ representation.
func convertint32ToVLQ(input uint32) []byte {
	if input == 0 {
		return []byte{0x0}
	}

	vlq := make([]byte, 0)
	for input > 0 {
		vlq = append(vlq, byte(input&0x7F))
		input >>= 7
	}

	reverseSlice(vlq)

	for i := 0; i < len(vlq)-1; i++ {
		vlq[i] |= 0x80
	}

	return vlq
}

// Get the end of a VLQ sequence based on MSB = 0.
func getVLQend(byteInput []byte, trackLeft int) int {
	for i := trackLeft; i < len(byteInput); i++ {
		if byteInput[i]&0x80 == 0 {
			return i
		}
	}
	return -1
}

// Encodes an array of unsigned 32-bit integers to VLQ representation.
func EncodeVarint(input []uint32) []byte {
	var vlqOutput []byte
	for _, num := range input {
		vlqOutput = append(vlqOutput, convertint32ToVLQ(num)...)
	}
	return vlqOutput
}

// Decodes an array of VLQ representations to unsigned 32-bit integers.
func DecodeVarint(input []byte) ([]uint32, error) {
	var trackLeft, trackRight int
	var varInt []uint32

	for trackLeft < len(input) {
		trackRight = getVLQend(input, trackLeft)
		if trackRight == -1 {
			return nil, fmt.Errorf("no valid VLQs")
		}

		var num uint32
		for i := trackLeft; i <= trackRight; i++ {
			num = (num << 7) | uint32(input[i]&0x7F)
		}

		varInt = append(varInt, num)
		trackLeft = trackRight + 1
	}

	return varInt, nil
}