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
	
	for input > 0 {
		vlq_bit = append(vlq_bit, byte(input&0x7F))
		input >>= 7
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
		if byte_input[i]&0x80 == 0 { // MSB is 0 - end of VLQ
			return i
		}
	}
	return -1 // Not a valid VLQ
}

// Encodes an array of unsigned 32 bit integers to VLQ representation
func EncodeVarint(input []uint32) []byte {
	vlq_output := make([]byte, 0, len(input)*2) // Pre-allocate capacity

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
	i := 0

	for i < len(input) {
		var num uint32
		var shift uint
		
		for {
			if i >= len(input) {
				return nil, fmt.Errorf("no valid VLQs")
			}
			
			b := input[i]
			i++
			
			num |= uint32(b&0x7F) << shift
			shift += 7
			
			if b&0x80 == 0 {
				break
			}
			
			if shift >= 32 {
				return nil, fmt.Errorf("no valid VLQs")
			}
		}
		
		var_int = append(var_int, num)
	}

	return var_int, nil
}