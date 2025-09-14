package sorting

import (
	"strconv"
	"unsafe"
)

const (
	describeNumberPrefix    = "This is the number "
	describeBoxPrefix      = "This is a box containing the number "
	describeFancyBoxPrefix = "This is a fancy box containing the number "
	returnToSender         = "Return to sender"
)

func DescribeNumber(f float64) string {
	buf := make([]byte, 0, 32)
	buf = append(buf, describeNumberPrefix...)
	buf = strconv.AppendFloat(buf, f, 'f', 1, 64)
	return *(*string)(unsafe.Pointer(&buf))
}

type NumberBox interface {
	Number() int
}

func DescribeNumberBox(nb NumberBox) string {
	buf := make([]byte, 0, 48)
	buf = append(buf, describeBoxPrefix...)
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
	buf := make([]byte, 0, 56)
	buf = append(buf, describeFancyBoxPrefix...)
	buf = strconv.AppendFloat(buf, float64(ExtractFancyNumber(fnb)), 'f', 1, 64)
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
		return returnToSender
	}
}