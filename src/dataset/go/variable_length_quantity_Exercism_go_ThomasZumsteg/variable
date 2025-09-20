package variablelengthquantity

import "errors"

func DecodeVarint(varint []byte) ([]uint32, error) {
	var tmp uint32
	result := make([]uint32, 0, len(varint)/2) // Preallocate assuming average 2 bytes per varint
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
		var buffer [5]byte // Maximum 5 bytes for a uint32 varint
		pos := len(buffer)
		for {
			pos--
			buffer[pos] = byte(varint & 0x7F)
			varint >>= 7
			if varint == 0 {
				break
			}
			buffer[pos] |= 0x80
		}
		result = append(result, buffer[pos:]...)
	}
	return result
}