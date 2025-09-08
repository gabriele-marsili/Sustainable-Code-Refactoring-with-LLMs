package variablelengthquantity

import "errors"

func EncodeVarint(input []uint32) []byte {
	var encoded []byte

	for _, val := range input {
		if val == 0 {
			encoded = append(encoded, 0)
			continue
		}

		var base128Val [5]byte // Max 5 bytes for uint32
		pos := len(base128Val)

		for val > 0 {
			pos--
			base128Val[pos] = byte(val & 0x7F)
			val >>= 7
		}

		for i := pos; i < len(base128Val)-1; i++ {
			base128Val[i] |= 0x80 // Set continuation bit
		}

		encoded = append(encoded, base128Val[pos:]...)
	}
	return encoded
}

func DecodeVarint(input []byte) ([]uint32, error) {
	var decoded []uint32
	var decodedInt uint32
	var shift uint

	for _, val := range input {
		decodedInt |= uint32(val&0x7F) << shift
		if val&0x80 == 0 {
			decoded = append(decoded, decodedInt)
			decodedInt = 0
			shift = 0
		} else {
			shift += 7
			if shift > 28 { // Prevent overflow for uint32
				return nil, errors.New("incomplete sequence")
			}
		}
	}

	if shift != 0 {
		return nil, errors.New("incomplete sequence")
	}

	return decoded, nil
}