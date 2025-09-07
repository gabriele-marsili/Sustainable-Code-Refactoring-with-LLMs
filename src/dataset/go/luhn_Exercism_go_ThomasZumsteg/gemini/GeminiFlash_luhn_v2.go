package luhn

import (
	"strconv"
	"unicode"
)

/*Valid determines if a luhn code is correct.*/
func Valid(code string) bool {
	sum, err := checksum(code)
	return err == nil && sum%10 == 0
}

/*AddCheck creates a valid luhn code.*/
func AddCheck(code string) string {
	sum, _ := checksum(code + "0")
	mod := sum % 10
	var finalDigit int
	if mod != 0 {
		finalDigit = 10 - mod
	}

	finalDigitStr := strconv.Itoa(finalDigit)

	if allFullWidth(code) {
		finalDigitStr = string(rune(int(finalDigitStr[0]) + int('０') - '0'))
	}
	return code + finalDigitStr
}

func allFullWidth(s string) bool {
	for _, r := range s {
		if !isFullWidthDigitOrNonDigit(r) {
			return false
		}
	}
	return true
}

func isFullWidthDigitOrNonDigit(r rune) bool {
	if !unicode.IsDigit(r) {
		return true
	}
	digit := int(r - '０')
	return 0 <= digit && digit <= 9
}

/*checksum computes the checksum of a luhn code*/
func checksum(code string) (int, error) {
	sum := 0
	numDigits := 0
	for i := len(code) - 1; i >= 0; i-- {
		r := rune(code[i])
		if !unicode.IsDigit(r) {
			if unicode.IsSpace(r) {
				continue
			}
			return 0, errors.New("invalid character")
		}

		digit := int(r - '0')
		if numDigits%2 == 1 {
			digit *= 2
			if digit > 9 {
				digit -= 9
			}
		}
		sum += digit
		numDigits++
	}

	if numDigits < 1 {
		return 0, errors.New("too short")
	}

	return sum, nil
}