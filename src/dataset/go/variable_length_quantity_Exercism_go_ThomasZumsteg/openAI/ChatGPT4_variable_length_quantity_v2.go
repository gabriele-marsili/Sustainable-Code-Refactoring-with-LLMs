package variablelengthquantity

import "errors"

func DecodeVarint(varint []byte) ([]uint32, error) {
	var tmp uint32
	result := make([]uint32, 0, len(varint)/2) // Preallocate with an estimated size
	for _, vint := range varint {
		tmp = (tmp << 7) | uint32(vint&0x7F)
		if vint&0x80 == 0 {
			result = append(result, tmp)
			tmp = 0
		}
	}
	if tmp != 0 {
		return nil, errors.New("Not a valid varint")
	}
	return result, nil
}

func EncodeVarint(varints []uint32) []byte {
	var result []byte
	for _, varint := range varints {
		var buffer [5]byte // Max 5 bytes for a 32-bit uint
		pos := len(buffer)
		buffer[pos-1] = byte(varint & 0x7F)
		for varint >>= 7; varint > 0; varint >>= 7 {
			pos--
			buffer[pos-1] = byte(varint&0x7F | 0x80)
		}
		result = append(result, buffer[pos-1:]...)
	}
	return result
}