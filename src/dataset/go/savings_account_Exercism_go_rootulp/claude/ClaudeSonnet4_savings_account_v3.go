package savings

const FixedInterestRate = .05

func GetFixedInterestRate() float32 {
	return FixedInterestRate
}

const DaysPerYear = 365

func GetDaysPerYear() int {
	return DaysPerYear
}

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

func GetMonth(month int) int {
	if month >= Jan && month <= Dec {
		return month
	}
	return Undefined
}

type AccNo string

const defaultAccountNumber AccNo = "XF348IJ"

func GetAccountNumber() AccNo {
	return defaultAccountNumber
}