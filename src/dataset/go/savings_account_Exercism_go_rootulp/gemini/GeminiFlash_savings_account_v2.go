package savings

const FixedInterestRate = .05

// GetFixedInterestRate returns the FixedInterestRate constant
func GetFixedInterestRate() float32 {
	return FixedInterestRate
}

const DaysPerYear = 365

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
	if month >= Jan && month <= Dec {
		return month
	}
	return Undefined
}

type AccNo string

var accountNumber AccNo = "XF348IJ"

func GetAccountNumber() AccNo {
	return accountNumber
}