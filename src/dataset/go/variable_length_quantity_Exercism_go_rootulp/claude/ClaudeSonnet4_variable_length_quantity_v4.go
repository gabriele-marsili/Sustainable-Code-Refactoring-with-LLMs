package variablelengthquantity

import "errors"

func EncodeVarint(input []uint32) (encoded []byte) {
	if len(input) == 0 {
		return nil
	}
	
	encoded = make([]byte, 0, len(input)*5)
	
	for _, val := range input {
		if val == 0 {
			encoded = append(encoded, 0)
			continue
		}
		
		start := len(encoded)
		for val > 0 {
			encoded = append(encoded, byte(val&0x7F))
			val >>= 7
		}
		
		end := len(encoded)
		for i, j := start, end-1; i < j; i, j = i+1, j-1 {
			encoded[i], encoded[j] = encoded[j], encoded[i]
		}
		
		for i := start; i < end-1; i++ {
			encoded[i] |= 0x80
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