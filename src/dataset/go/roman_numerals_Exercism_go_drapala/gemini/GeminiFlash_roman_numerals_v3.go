package romannumerals

import "fmt"

var (
	thousandsMap = []string{"", "M", "MM", "MMM"}
	hundredsMap  = []string{"", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM"}
	tensMap      = []string{"", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC"}
	onesMap      = []string{"", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"}
)

func ToRomanNumeral(input int) (string, error) {
	if input < 1 || input > 3000 {
		return "", fmt.Errorf("number must be between 1 and 3000")
	}

	thousands := input / 1000
	hundreds := (input % 1000) / 100
	tens := (input % 100) / 10
	ones := input % 10

	return thousandsMap[thousands] + hundredsMap[hundreds] + tensMap[tens] + onesMap[ones], nil
}