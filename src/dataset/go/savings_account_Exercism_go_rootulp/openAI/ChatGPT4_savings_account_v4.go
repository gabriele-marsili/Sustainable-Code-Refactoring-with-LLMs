package savings

const (
	FixedInterestRate = 0.05
	DaysPerYear       = 365
	Undefined         = 0
	Jan               = 1
	Feb               = 2
	Mar               = 3
	Apr               = 4
	May               = 5
	Jun               = 6
	Jul               = 7
	Aug               = 8
	Sep               = 9
	Oct               = 10
	Nov               = 11
	Dec               = 12
)

// GetFixedInterestRate returns the FixedInterestRate constant
func GetFixedInterestRate() float32 {
	return FixedInterestRate
}

// GetDaysPerYear returns the DaysPerYear constant
func GetDaysPerYear() int {
	return DaysPerYear
}

// GetMonth returns the value for the given month
func GetMonth(month int) int {
	if month >= Jan && month <= Dec {
		return month
	}
	return Undefined
}

type AccNo string

// GetAccountNumber returns a predefined account number
func GetAccountNumber() AccNo {
	return "XF348IJ"
}