package variablelengthquantity

import "errors"

func DecodeVarint(varint []byte) ([]uint32, error) {
	result := make([]uint32, 0, len(varint)/2)
	var current uint32
	for _, b := range varint {
		current = (current << 7) | uint32(b&0x7F)
		if b&0x80 == 0 {
			result = append(result, current)
			current = 0
		}
	}
	if len(varint) > 0 && varint[len(varint)-1]&0x80 != 0 {
		return nil, errors.New("Not a valid varint")
	}
	return result, nil
}

func EncodeVarint(varints []uint32) []byte {
	result := make([]byte, 0, len(varints)*2)
	for _, v := range varints {
		var buf []byte
		for {
			b := byte(v & 0x7F)
			v >>= 7
			if v != 0 {
				b |= 0x80
			}
			buf = append([]byte{b}, buf...)
			if v == 0 {
				break
			}
		}
		result = append(result, buf...)
	}
	return result
}