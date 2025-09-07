package say

import (
	"strings"
)

type NumStruct struct {
	billions  int64
	millions  int64
	thousands int64
	hundreds  int64
}

var numsMap = map[int64]string{
	0:  "zero",
	1:  "one",
	2:  "two",
	3:  "three",
	4:  "four",
	5:  "five",
	6:  "six",
	7:  "seven",
	8:  "eight",
	9:  "nine",
	10: "ten",
	11: "eleven",
	12: "twelve",
	13: "thirteen",
	14: "fourteen",
	15: "fifteen",
	16: "sixteen",
	17: "seventeen",
	18: "eighteen",
	19: "nineteen",
	20: "twenty",
	30: "thirty",
	40: "forty",
	50: "fifty",
	60: "sixty",
	70: "seventy",
	80: "eighty",
	90: "ninety",
}

func Ones2Tens(n int64) string {
	if n < 10 {
		return numsMap[n]
	}
	if n < 20 {
		return numsMap[n]
	}
	tens := n / 10 * 10
	ones := n % 10
	if ones == 0 {
		return numsMap[tens]
	}
	return numsMap[tens] + "-" + numsMap[ones]
}

func Ones2Hundreds(n int64) string {
	if n < 100 {
		return Ones2Tens(n)
	}
	hundreds := n / 100
	remainder := n % 100
	if remainder == 0 {
		return numsMap[hundreds] + " hundred"
	}
	return numsMap[hundreds] + " hundred " + Ones2Tens(remainder)
}

func SplitNum(n int64) NumStruct {
	return NumStruct{
		billions:  n / 1_000_000_000,
		millions:  (n / 1_000_000) % 1_000,
		thousands: (n / 1_000) % 1_000,
		hundreds:  n % 1_000,
	}
}

func GenerateName(n NumStruct) string {
	var sb strings.Builder

	if n.billions != 0 {
		sb.WriteString(Ones2Hundreds(n.billions) + " billion ")
	}
	if n.millions != 0 {
		sb.WriteString(Ones2Hundreds(n.millions) + " million ")
	}
	if n.thousands != 0 {
		sb.WriteString(Ones2Hundreds(n.thousands) + " thousand ")
	}
	if n.hundreds != 0 || sb.Len() == 0 {
		sb.WriteString(Ones2Hundreds(n.hundreds))
	}

	return strings.TrimSpace(sb.String())
}

func Say(n int64) (string, bool) {
	if n < 0 || n > 999_999_999_999 {
		return "", false
	}
	return GenerateName(SplitNum(n)), true
}