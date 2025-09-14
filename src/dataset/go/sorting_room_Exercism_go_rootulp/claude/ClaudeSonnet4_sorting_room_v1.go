package sorting

import (
	"strconv"
	"unsafe"
)

func DescribeNumber(f float64) string {
	// Pre-allocate buffer with known capacity to avoid reallocations
	buf := make([]byte, 0, 32)
	buf = append(buf, "This is the number "...)
	buf = strconv.AppendFloat(buf, f, 'f', 1, 64)
	return *(*string)(unsafe.Pointer(&buf))
}

type NumberBox interface {
	Number() int
}

func DescribeNumberBox(nb NumberBox) string {
	// Pre-allocate buffer and avoid float64 conversion
	buf := make([]byte, 0, 48)
	buf = append(buf, "This is a box containing the number "...)
	buf = strconv.AppendFloat(buf, float64(nb.Number()), 'f', 1, 64)
	return *(*string)(unsafe.Pointer(&buf))
}

type FancyNumber struct {
	n string
}

func (i FancyNumber) Value() string {
	return i.n
}

type FancyNumberBox interface {
	Value() string
}

func ExtractFancyNumber(fnb FancyNumberBox) int {
	result, err := strconv.Atoi(fnb.Value())
	if err != nil {
		return 0
	}
	return result
}

func DescribeFancyNumberBox(fnb FancyNumberBox) string {
	// Extract number once and reuse
	num := ExtractFancyNumber(fnb)
	buf := make([]byte, 0, 56)
	buf = append(buf, "This is a fancy box containing the number "...)
	buf = strconv.AppendFloat(buf, float64(num), 'f', 1, 64)
	return *(*string)(unsafe.Pointer(&buf))
}

func DescribeAnything(i interface{}) string {
	switch v := i.(type) {
	case int:
		return DescribeNumber(float64(v))
	case float64:
		return DescribeNumber(v)
	case NumberBox:
		return DescribeNumberBox(v)
	case FancyNumberBox:
		return DescribeFancyNumberBox(v)
	default:
		return "Return to sender"
	}
}