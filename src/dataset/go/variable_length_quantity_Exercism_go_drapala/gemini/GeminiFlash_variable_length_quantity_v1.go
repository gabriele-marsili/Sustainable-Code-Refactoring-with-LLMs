package variablelengthquantity

import (
	"fmt"
)

// Convert a single unsigned 32 bit integer to VLQ representation
func convertint32ToVLQ(input uint32) []byte {
	if input == 0 {
		return []byte{0x0}
	}

	var vlqBytes []byte
	for {
		byteVal := byte(input & 0x7f)
		input >>= 7
		if input != 0 {
			byteVal |= 0x80
		}
		vlqBytes = append([]byte{byteVal}, vlqBytes...)
		if input == 0 {
			break
		}
	}
	return vlqBytes
}

// Encodes an array of unsigned 32 bit integers to VLQ representation
func EncodeVarint(input []uint32) []byte {
	var vlqOutput []byte
	for _, num := range input {
		vlqOutput = append(vlqOutput, convertint32ToVLQ(num)...)
	}
	return vlqOutput
}

// Decodes an array of VLQ representations to unsigned 32 bit integers
func DecodeVarint(input []byte) ([]uint32, error) {
	var varInts []uint32
	var current uint32
	for i, b := range input {
		current = (current << 7) | uint32(b&0x7f)
		if b&0x80 == 0 {
			varInts = append(varInts, current)
			current = 0
		} else if current > (1<<27)-1 {
			return nil, fmt.Errorf("overflow")
		}
	}

	if current != 0 {
		return nil, fmt.Errorf("incomplete VLQ sequence")
	}

	if len(varInts) == 0 && len(input) != 0 {
		return nil, fmt.Errorf("no valid VLQs")
	}

	return varInts, nil
}