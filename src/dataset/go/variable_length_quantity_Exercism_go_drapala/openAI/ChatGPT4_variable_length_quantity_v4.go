package variablelengthquantity

import (
	"errors"
)

// Returns the position of the highest set bit in a 32-bit integer.
func getMax1Bit(val uint32) int {
	if val == 0 {
		return -1
	}
	pos := 31
	for val>>pos == 0 {
		pos--
	}
	return pos
}

// Returns the value of the nth bit of a 32-bit integer.
func getNthBit(val, n uint32) int {
	return int((val >> n) & 1)
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

	for i := 0; i < len(vlq)-1; i++ {
		vlq[i] |= 0x80
	}

	// Reverse the slice in place
	for i, j := 0, len(vlq)-1; i < j; i, j = i+1, j-1 {
		vlq[i], vlq[j] = vlq[j], vlq[i]
	}

	return vlq
}

// Finds the end of a VLQ sequence based on MSB = 0.
func getVLQend(byteInput []byte, start int) int {
	for i := start; i < len(byteInput); i++ {
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
	var result []uint32
	start := 0

	for start < len(input) {
		end := getVLQend(input, start)
		if end == -1 {
			return nil, errors.New("invalid VLQ sequence")
		}

		var value uint32
		for i := start; i <= end; i++ {
			value = (value << 7) | uint32(input[i]&0x7F)
		}

		result = append(result, value)
		start = end + 1
	}

	return result, nil
}