package variablelengthquantity

import "errors"

func EncodeVarint(input []uint32) (encoded []byte) {
	for _, val := range input {
		if val == 0 {
			encoded = append(encoded, 0)
			continue
		}

		var base128Val [5]byte
		pos := len(base128Val)

		for val > 0 {
			pos--
			base128Val[pos] = byte(val%128) | 0b10000000
			val /= 128
		}

		base128Val[len(base128Val)-1] &^= 0b10000000
		encoded = append(encoded, base128Val[pos:]...)
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