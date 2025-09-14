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
	return describeNumberPrefix + formatFloat(f)
}

type NumberBox interface {
	Number() int
}

func DescribeNumberBox(nb NumberBox) string {
	return describeBoxPrefix + formatFloat(float64(nb.Number()))
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
	i, err := strconv.Atoi(fnb.Value())
	if err != nil {
		return 0
	}
	return i
}

func DescribeFancyNumberBox(fnb FancyNumberBox) string {
	return describeFancyBoxPrefix + formatFloat(float64(ExtractFancyNumber(fnb)))
}

func DescribeAnything(i interface{}) string {
	switch v := i.(type) {
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

func formatFloat(f float64) string {
	if f == float64(int64(f)) && f >= -999999999 && f <= 999999999 {
		return strconv.FormatInt(int64(f), 10) + ".0"
	}
	
	buf := make([]byte, 0, 24)
	buf = strconv.AppendFloat(buf, f, 'f', 1, 64)
	return *(*string)(unsafe.Pointer(&buf))
}