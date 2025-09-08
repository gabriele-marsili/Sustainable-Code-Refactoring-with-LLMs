package variablelengthquantity

import "errors"

func DecodeVarint(varint []byte) ([]uint32, error) {
	if len(varint) == 0 {
		return []uint32{}, nil
	}
	
	result := make([]uint32, 0, len(varint)/2+1)
	var tmp uint32
	
	for _, vint := range varint {
		tmp = (tmp << 7) | uint32(vint&0x7F)
		if vint&0x80 == 0 {
			result = append(result, tmp)
			tmp = 0
		}
	}
	
	if varint[len(varint)-1]&0x80 != 0 {
		return nil, errors.New("Not a valid varint")
	}
	
	return result, nil
}

func EncodeVarint(varints []uint32) []byte {
	if len(varints) == 0 {
		return []byte{}
	}
	
	totalBytes := 0
	for _, v := range varints {
		if v == 0 {
			totalBytes++
		} else {
			totalBytes += (32 - countLeadingZeros(v) + 6) / 7
		}
	}
	
	result := make([]byte, 0, totalBytes)
	
	for i := len(varints) - 1; i >= 0; i-- {
		varint := varints[i]
		
		temp := make([]byte, 0, 5)
		temp = append(temp, byte(varint&0x7F))
		
		for varint >>= 7; varint > 0; varint >>= 7 {
			temp = append(temp, byte(varint&0x7F|0x80))
		}
		
		for j := len(temp) - 1; j >= 0; j-- {
			result = append(result, temp[j])
		}
	}
	
	return result
}

func countLeadingZeros(x uint32) int {
	if x == 0 {
		return 32
	}
	n := 0
	if x <= 0x0000FFFF {
		n += 16
		x <<= 16
	}
	if x <= 0x00FFFFFF {
		n += 8
		x <<= 8
	}
	if x <= 0x0FFFFFFF {
		n += 4
		x <<= 4
	}
	if x <= 0x3FFFFFFF {
		n += 2
		x <<= 2
	}
	if x <= 0x7FFFFFFF {
		n++
	}
	return n
}