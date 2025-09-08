package variablelengthquantity

import (
	"fmt"
	"math"
)

func getMax1Bit(val uint32) int {
	if val == 0 {
		return -1
	}
	return 31 - bits.LeadingZeros32(val)
}

func getNthBit(val, n uint32) int {
	return int((val >> n) & 1)
}

func calculateFromBinary(value, n int) int {
	return value << n
}

func reverseSlice(input []byte) []byte {
	for i, j := 0, len(input)-1; i < j; i, j = i+1, j-1 {
		input[i], input[j] = input[j], input[i]
	}
	return input
}

func convertint32ToVLQ(input uint32) []byte {
	if input == 0 {
		return []byte{0x0}
	}

	vlq_bit := make([]byte, 0)
	for input > 0 {
		vlq_bit = append(vlq_bit, byte(input&0x7F))
		input >>= 7
	}

	for i := 0; i < len(vlq_bit)-1; i++ {
		vlq_bit[i] |= 0x80
	}

	return reverseSlice(vlq_bit)
}

func getVLQend(byte_input []byte, track_left int) int {
	for i := track_left; i < len(byte_input); i++ {
		if byte_input[i]&0x80 == 0 {
			return i
		}
	}
	return -1
}

func EncodeVarint(input []uint32) []byte {
	vlq_output := make([]byte, 0, len(input)*5)
	for _, num := range input {
		vlq_output = append(vlq_output, convertint32ToVLQ(num)...)
	}
	return vlq_output
}

func DecodeVarint(input []byte) ([]uint32, error) {
	var track_left, track_right int
	var_int := make([]uint32, 0, len(input)/2)

	for track_left < len(input) {
		track_right = getVLQend(input, track_left)
		if track_right == -1 {
			return nil, fmt.Errorf("no valid VLQs")
		}

		var num uint32
		for i := track_left; i <= track_right; i++ {
			num = (num << 7) | uint32(input[i]&0x7F)
		}
		var_int = append(var_int, num)
		track_left = track_right + 1
	}

	return var_int, nil
}