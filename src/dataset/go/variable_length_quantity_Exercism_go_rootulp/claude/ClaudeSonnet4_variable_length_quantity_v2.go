package variablelengthquantity

import "errors"

func EncodeVarint(input []uint32) (encoded []byte) {
	if len(input) == 0 {
		return nil
	}
	
	// Pre-allocate with estimated capacity
	encoded = make([]byte, 0, len(input)*5)
	
	for _, val := range input {
		if val == 0 {
			encoded = append(encoded, 0)
			continue
		}

		// Calculate number of bytes needed
		temp := val
		byteCount := 0
		for temp > 0 {
			temp >>= 7
			byteCount++
		}

		// Encode directly without intermediate slice
		startIdx := len(encoded)
		encoded = append(encoded, make([]byte, byteCount)...)
		
		for i := byteCount - 1; i >= 0; i-- {
			encoded[startIdx+i] = byte(val & 0x7F)
			if i > 0 {
				encoded[startIdx+i] |= 0x80
			}
			val >>= 7
		}
	}
	return encoded
}

func DecodeVarint(input []byte) (decoded []uint32, e error) {
	if len(input) == 0 {
		return nil, nil
	}
	
	if input[len(input)-1]&0x80 != 0 {
		return nil, errors.New("incomplete sequence")
	}

	// Pre-allocate with estimated capacity
	decoded = make([]uint32, 0, len(input)/2)
	var decodedInt uint32

	for _, val := range input {
		decodedInt = (decodedInt << 7) | uint32(val&0x7F)
		if val&0x80 == 0 {
			decoded = append(decoded, decodedInt)
			decodedInt = 0
		}
	}
	return decoded, nil
}