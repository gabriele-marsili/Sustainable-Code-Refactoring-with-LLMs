package say

import (
	"strings"
)

var nums = map[int64]string{
	0: "zero", 1: "one", 2: "two", 3: "three", 4: "four", 5: "five",
	6: "six", 7: "seven", 8: "eight", 9: "nine", 10: "ten",
	11: "eleven", 12: "twelve", 13: "thirteen", 14: "fourteen", 15: "fifteen",
	16: "sixteen", 17: "seventeen", 18: "eighteen", 19: "nineteen", 20: "twenty",
	30: "thirty", 40: "forty", 50: "fifty", 60: "sixty", 70: "seventy",
	80: "eighty", 90: "ninety",
}

type NumStruct struct {
	billions int64
	millions int64
	thousands int64
	hundreds int64
}

func CreateNumsMap() map[int64]string {
	return nums
}

func Ones2Tens(n int64) string {
	if n < 10 {
		return nums[n]
	}
	if n < 20 {
		return nums[n]
	}
	
	tens := n / 10
	ones := n % 10
	if ones == 0 {
		return nums[tens*10]
	}
	return nums[tens*10] + "-" + nums[ones]
}

func Ones2Hundreds(n int64) string {
	if n < 100 {
		return Ones2Tens(n)
	}
	
	hundreds := n / 100
	remainder := n % 100
	result := nums[hundreds] + " hundred"
	if remainder != 0 {
		result += " " + Ones2Tens(remainder)
	}
	return result
}

func SplitNum(n int64) NumStruct {
	billions := n / 1000000000
	millions := (n / 1000000) % 1000
	thousands := (n / 1000) % 1000
	hundreds := n % 1000
	
	return NumStruct{
		billions: billions,
		millions: millions,
		thousands: thousands,
		hundreds: hundreds,
	}
}

func GenerateName(n NumStruct) string {
	var parts []string
	
	if n.billions != 0 {
		parts = append(parts, Ones2Hundreds(n.billions)+" billion")
	}
	if n.millions != 0 {
		parts = append(parts, Ones2Hundreds(n.millions)+" million")
	}
	if n.thousands != 0 {
		parts = append(parts, Ones2Hundreds(n.thousands)+" thousand")
	}
	if n.hundreds != 0 || len(parts) == 0 {
		parts = append(parts, Ones2Hundreds(n.hundreds))
	}
	
	return strings.Join(parts, " ")
}

func Say(n int64) (string, bool) {
	if n < 0 || n > 999999999999 {
		return "", false
	}
	return GenerateName(SplitNum(n)), true
}