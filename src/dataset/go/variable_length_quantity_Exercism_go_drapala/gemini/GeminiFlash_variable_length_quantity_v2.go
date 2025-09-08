package variablelengthquantity

import (
	"fmt"
)

// Starts from the left of a 32-bit integer and returns the first bit that has a 1.
func getMax1Bit(val uint32) int {
	if val == 0 {
		return -1
	}
	msb := 0
	for val > 0 {
		val >>= 1
		msb++
	}
	return msb - 1
}

// Returns the value of the nth bit of a 32-bit integer.
func getNthBit(val, n uint32) int {
	return int((val >> n) & 1)
}

// Convert a binary number to decimal for a given power of 2
func calculateFromBinary(value, n int) int {
	result := 1
	for i := 0; i < n; i++ {
		result *= 2
	}
	return value * result
}

// Reverse a slice
func reverseSlice(input []byte) []byte {
	length := len(input)
	output := make([]byte, length)
	for i := 0; i < length; i++ {
		output[i] = input[length-1-i]
	}
	return output
}

// Convets a single unsigned 32 bit integer to VLQ representation
func convertint32ToVLQ(input uint32) []byte {
	if input == 0 {
		return []byte{0x0}
	}

	var vlq_bit []byte
	for {
		byteVal := byte(input & 0x7f)
		input >>= 7
		if input != 0 {
			byteVal |= 0x80
		}
		vlq_bit = append([]byte{byteVal}, vlq_bit...)
		if input == 0 {
			break
		}
	}
	return vlq_bit
}

// Get the end of a VLQ sequence based on MSB = 0
func getVLQend(byte_input []byte, track_left int) int {
	for i := track_left; i < len(byte_input); i++ {
		if byte_input[i]&0x80 == 0 {
			return i
		}
	}
	return -1
}

// Encodes an array of unsigned 32 bit integers to VLQ representation
func EncodeVarint(input []uint32) []byte {
	vlq_output := make([]byte, 0)
	for _, num := range input {
		vlq_output = append(vlq_output, convertint32ToVLQ(num)...)
	}
	return vlq_output
}

// Decodes an array of VLQ representations to unsigned 32 bit integers
func DecodeVarint(input []byte) ([]uint32, error) {
	var var_int []uint32
	var current uint32
	for i := 0; i < len(input); i++ {
		current = (current << 7) | uint32(input[i]&0x7f)
		if input[i]&0x80 == 0 {
			var_int = append(var_int, current)
			current = 0
		}
	}

	if current != 0 {
		return nil, fmt.Errorf("incomplete VLQ sequence")
	}

	if len(var_int) == 0 && len(input) != 0 {
		return nil, fmt.Errorf("no valid VLQs")
	}

	return var_int, nil
}