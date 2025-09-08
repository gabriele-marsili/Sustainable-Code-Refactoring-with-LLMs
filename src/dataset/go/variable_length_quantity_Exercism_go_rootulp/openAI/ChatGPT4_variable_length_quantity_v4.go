package variablelengthquantity

import "errors"

func EncodeVarint(input []uint32) []byte {
	encoded := make([]byte, 0, len(input)*5) // Preallocate assuming max 5 bytes per uint32

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

		base128Val[len(base128Val)-1] &^= 0b10000000 // Clear MSB of the last byte
		encoded = append(encoded, base128Val[pos:]...)
	}
	return encoded
}

func DecodeVarint(input []byte) ([]uint32, error) {
	decoded := make([]uint32, 0, len(input)/2) // Preallocate assuming average 2 bytes per uint32
	var decodedInt uint32
	var shift uint

	for _, val := range input {
		decodedInt |= uint32(val&0b01111111) << shift
		if val&0b10000000 == 0 {
			decoded = append(decoded, decodedInt)
			decodedInt = 0
			shift = 0
		} else {
			shift += 7
			if shift > 28 {
				return nil, errors.New("incomplete sequence")
			}
		}
	}

	if shift != 0 {
		return nil, errors.New("incomplete sequence")
	}

	return decoded, nil
}