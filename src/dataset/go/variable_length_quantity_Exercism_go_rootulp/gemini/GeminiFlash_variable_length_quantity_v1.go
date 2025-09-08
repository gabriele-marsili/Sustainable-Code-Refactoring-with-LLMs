package variablelengthquantity

import "errors"

func EncodeVarint(input []uint32) []byte {
	encoded := make([]byte, 0, len(input)*2) // Pre-allocate for efficiency

	for _, val := range input {
		if val == 0 {
			encoded = append(encoded, 0)
			continue
		}

		var base128Val []byte
		for val > 0 {
			remainder := val & 0x7F // val % 128 optimized
			val >>= 7             // val /= 128 optimized
			base128Val = append([]byte{byte(remainder)}, base128Val...)
		}

		for i := 0; i < len(base128Val)-1; i++ {
			base128Val[i] |= 0x80 // Add leading bit
		}
		encoded = append(encoded, base128Val...)
	}
	return encoded
}

func DecodeVarint(input []byte) ([]uint32, error) {
	decoded := make([]uint32, 0, len(input)/2) // Pre-allocate
	var decodedInt uint32

	for i, val := range input {
		decodedInt = (decodedInt << 7) | uint32(val&0x7F) // Optimized multiplication and masking

		if val&0x80 == 0 {
			decoded = append(decoded, decodedInt)
			decodedInt = 0
		} else if i == len(input)-1 {
			return nil, errors.New("incomplete sequence")
		}
	}

	if len(input) > 0 && input[len(input)-1]&0x80 != 0 {
		return nil, errors.New("incomplete sequence")
	}

	return decoded, nil
}