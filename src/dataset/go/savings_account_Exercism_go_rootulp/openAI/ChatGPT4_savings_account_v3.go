package savings

const (
	FixedInterestRate = 0.05
	DaysPerYear       = 365
)

func GetFixedInterestRate() float32 {
	return FixedInterestRate
}

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

func GetAccountNumber() AccNo {
	return "XF348IJ"
}