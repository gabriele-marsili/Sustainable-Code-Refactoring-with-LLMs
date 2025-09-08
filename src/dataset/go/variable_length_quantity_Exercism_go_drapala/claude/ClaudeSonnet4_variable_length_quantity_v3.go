package variablelengthquantity

import (
	"fmt"
	"bits"
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
	length := len(input)
	output := make([]byte, length)
	for i := 0; i < length; i++ {
		output[i] = input[length-1-i]
	}
	return output
}

func convertint32ToVLQ(input uint32) []byte {
	if input == 0 {
		return []byte{0x0}
	}

	vlq_bit := make([]byte, 0, 5)
	
	for input > 0 {
		vlq_bit = append(vlq_bit, byte(input&0x7F))
		input >>= 7
	}
	
	vlq_bit = reverseSlice(vlq_bit)

	for i := 0; i < len(vlq_bit)-1; i++ {
		vlq_bit[i] |= 0x80
	}
	
	return vlq_bit
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
	if len(input) == 0 {
		return []byte{}
	}
	
	vlq_output := make([]byte, 0, len(input)*5)

	for _, num := range input {
		vlq_output = append(vlq_output, convertint32ToVLQ(num)...)
	}
	return vlq_output
}

func DecodeVarint(input []byte) ([]uint32, error) {
	if len(input) == 0 {
		return []uint32{}, nil
	}

	var_int := make([]uint32, 0, len(input)/5+1)
	track_left := 0

	for track_left < len(input) {
		track_right := getVLQend(input, track_left)
		if track_right == -1 {
			break
		}

		var num_10 uint32
		shift := uint32(0)
		
		for i := track_right; i >= track_left; i-- {
			byteVal := uint32(input[i] & 0x7F)
			num_10 |= byteVal << shift
			shift += 7
		}

		var_int = append(var_int, num_10)
		track_left = track_right + 1
	}

	if len(var_int) == 0 && len(input) != 0 {
		return nil, fmt.Errorf("no valid VLQs")
	}
	return var_int, nil
}