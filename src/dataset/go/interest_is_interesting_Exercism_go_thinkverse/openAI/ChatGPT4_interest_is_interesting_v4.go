package interest

func InterestRate(balance float64) float32 {
	if balance < 0 {
		return 3.213
	} else if balance < 1000 {
		return 0.5
	} else if balance >= 5000 {
		return 2.475
	}
	return 1.621
}

func Interest(balance float64) float64 {
	return balance * float64(InterestRate(balance)) * 0.01
}

func AnnualBalanceUpdate(balance float64) float64 {
	return balance * (1 + float64(InterestRate(balance))*0.01)
}

func YearsBeforeDesiredBalance(balance, targetBalance float64) int {
	years := 0
	for balance < targetBalance {
		balance *= 1 + float64(InterestRate(balance))*0.01
		years++
	}
	return years
}