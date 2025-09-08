package variablelengthquantity

import "errors"

func DecodeVarint(varint []byte) ([]uint32, error) {
	result := make([]uint32, 0)
	var current uint32
	for _, b := range varint {
		current = (current << 7) | uint32(b&0x7F)
		if b&0x80 == 0 {
			result = append(result, current)
			current = 0
		}
	}
	if len(varint) > 0 && varint[len(varint)-1]&0x80 != 0 {
		return nil, errors.New("invalid varint")
	}
	return result, nil
}

func EncodeVarint(varints []uint32) []byte {
	result := make([]byte, 0)
	for _, v := range varints {
		var buffer []byte
		for {
			b := byte(v & 0x7F)
			v >>= 7
			if v != 0 {
				b |= 0x80
			}
			buffer = append([]byte{b}, buffer...)
			if v == 0 {
				break
			}
		}
		result = append(result, buffer...)
	}
	return result
}