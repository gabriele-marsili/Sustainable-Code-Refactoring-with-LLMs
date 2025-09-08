package variablelengthquantity

import "errors"

func EncodeVarint(input []uint32) (encoded []byte) {
	for _, val := range input {
		if val == 0 {
			encoded = append(encoded, 0)
			continue
		}

		var base128Val []byte
		for {
			remainder := byte(val % 128)
			val /= 128
			if len(base128Val) > 0 {
				remainder |= 0b10000000
			}
			base128Val = append(base128Val, remainder)
			if val == 0 {
				break
			}
		}

		// Reverse base128Val in-place to avoid extra memory allocation
		for i, j := 0, len(base128Val)-1; i < j; i, j = i+1, j-1 {
			base128Val[i], base128Val[j] = base128Val[j], base128Val[i]
		}

		encoded = append(encoded, base128Val...)
	}
	return encoded
}

func DecodeVarint(input []byte) (decoded []uint32, e error) {
	var decodedInt uint32
	for i, val := range input {
		decodedInt = (decodedInt << 7) | uint32(val&0b01111111)
		if val&0b10000000 == 0 {
			decoded = append(decoded, decodedInt)
			decodedInt = 0
		} else if i == len(input)-1 {
			return nil, errors.New("incomplete sequence")
		}
	}
	return decoded, nil
}