package variablelengthquantity

import (
	"fmt"
	"bits"
)

// Starts from the left of a 32-bit integer and returns the first bit that has a 1.
func getMax1Bit(val uint32) int {
	if val == 0 {
		return -1
	}
	return 31 - bits.LeadingZeros32(val)
}

// Returns the value of the nth bit of a 32-bit integer.
func getNthBit(val, n uint32) int {
	return int((val >> n) & 1)
}

// Convert a binary number to decimal for a given power of 2
func calculateFromBinary(value, n int) int {
	return value << n
}

// Reverse a slice
func reverseSlice(input []byte) []byte {
	output := make([]byte, len(input))
	for i := 0; i < len(input); i++ {
		output[i] = input[len(input)-1-i]
	}
	return output
}

// Convets a single unsigned 32 bit integer to VLQ representation
func convertint32ToVLQ(input uint32) []byte {
	if input == 0 {
		return []byte{0x0}
	}

	vlq_bit := make([]byte, 0, 5) // Pre-allocate capacity for typical case
	var num_10 int
	var c int

	maxBit := getMax1Bit(input)
	for i := 0; i <= maxBit; i++ {
		if (input>>uint32(i))&1 != 0 {
			num_10 |= 1 << c
		}
		c++
		if c == 7 {
			vlq_bit = append(vlq_bit, byte(num_10))
			c = 0
			num_10 = 0
		}
		if i == maxBit && c != 0 {
			vlq_bit = append(vlq_bit, byte(num_10))
		}
	}

	vlq_bit = reverseSlice(vlq_bit)

	// Add MSB bit
	for i := 0; i < len(vlq_bit)-1; i++ {
		vlq_bit[i] |= 0x80
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
	if len(input) == 0 {
		return []byte{}
	}
	
	vlq_output := make([]byte, 0, len(input)*5) // Pre-allocate capacity
	for _, num := range input {
		vlq_output = append(vlq_output, convertint32ToVLQ(num)...)
	}
	return vlq_output
}

// Decodes an array of VLQ representations to unsigned 32 bit integers
func DecodeVarint(input []byte) ([]uint32, error) {
	if len(input) == 0 {
		return []uint32{}, nil
	}

	var_int := make([]uint32, 0, len(input)/2) // Pre-allocate capacity
	track_left := 0

	for track_left < len(input) {
		track_right := getVLQend(input, track_left)
		if track_right == -1 {
			break
		}

		var num_10 uint32
		pow := 0
		for i := track_right; i >= track_left; i-- {
			val := uint32(input[i] & 0x7F) // Mask out MSB
			num_10 |= val << pow
			pow += 7
		}

		var_int = append(var_int, num_10)
		track_left = track_right + 1
	}

	if len(var_int) == 0 && len(input) != 0 {
		return nil, fmt.Errorf("no valid VLQs")
	}
	return var_int, nil
}