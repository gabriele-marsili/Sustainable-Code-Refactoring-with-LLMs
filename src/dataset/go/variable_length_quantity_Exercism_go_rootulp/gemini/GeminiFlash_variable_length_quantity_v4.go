package variablelengthquantity

import "errors"

func EncodeVarint(input []uint32) (encoded []byte) {
	encoded = make([]byte, 0, len(input)*2) // Pre-allocate for potential growth

	for _, val := range input {
		if val == 0 {
			encoded = append(encoded, 0)
			continue
		}

		var base128Val []byte
		for val > 0 {
			base128Val = append([]byte{byte(val % 128)}, base128Val...)
			val /= 128
		}

		for i := 0; i < len(base128Val)-1; i++ {
			base128Val[i] |= 0x80 // Set the MSB for all but the last byte
		}

		encoded = append(encoded, base128Val...)
	}
	return encoded
}

func DecodeVarint(input []byte) (decoded []uint32, e error) {
	decoded = make([]uint32, 0, len(input)/2) // Pre-allocate for potential growth
	var decodedInt uint32

	for _, val := range input {
		decodedInt = (decodedInt << 7) | uint32(val&0x7F) // Shift and mask

		if val&0x80 == 0 {
			decoded = append(decoded, decodedInt)
			decodedInt = 0
		}
	}

	if input[len(input)-1]&0x80 != 0 {
		return nil, errors.New("incomplete sequence")
	}

	return decoded, nil
}