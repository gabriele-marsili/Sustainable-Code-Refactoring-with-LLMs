package savings

const (
	FixedInterestRate = 0.05
	DaysPerYear       = 365
)

var months = map[int]int{
	1: Jan, 2: Feb, 3: Mar, 4: Apr, 5: May, 6: Jun,
	7: Jul, 8: Aug, 9: Sep, 10: Oct, 11: Nov, 12: Dec,
}

// GetFixedInterestRate returns the FixedInterestRate constant
func GetFixedInterestRate() float32 {
	return FixedInterestRate
}

// GetDaysPerYear returns the DaysPerYear constant
func GetDaysPerYear() int {
	return DaysPerYear
}

// Jan-Dec have values of 1-12
const (
	Undefined int = iota
	Jan
	Feb
	Mar
	Apr
	May
	Jun
	Jul
	Aug
	Sep
	Oct
	Nov
	Dec
)

// GetMonth returns the value for the given month
func GetMonth(month int) int {
	if val, exists := months[month]; exists {
		return val
	}
	return Undefined
}

type AccNo string

// GetAccountNumber returns a predefined account number
func GetAccountNumber() AccNo {
	return "XF348IJ"
}