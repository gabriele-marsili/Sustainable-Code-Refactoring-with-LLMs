package interest

// InterestRate returns the interest rate for the provided balance.
func InterestRate(balance float64) float32 {
	if balance < 0 {
		return 3.213
	}
	if balance < 1000 {
		return 0.5
	}
	if balance >= 5000 {
		return 2.475
	}
	return 1.621
}

// Interest calculates the interest for the provided balance.
func Interest(balance float64) float64 {
	rate := InterestRate(balance)
	return balance * float64(rate) / 100
}

// AnnualBalanceUpdate calculates the annual balance update, taking into account the interest rate.
func AnnualBalanceUpdate(balance float64) float64 {
	return balance + Interest(balance)
}

// YearsBeforeDesiredBalance calculates the minimum number of years required to reach the desired balance:
func YearsBeforeDesiredBalance(balance, targetBalance float64) int {
	if balance >= targetBalance {
		return 0
	}

	rate := InterestRate(balance)
	interestRate := float64(rate) / 100.0

	years := 0
	for balance < targetBalance && years < 1000 {
		balance += balance * interestRate
		years++
	}

	if balance < targetBalance {
		return 1000 // Or some other large number to indicate it won't reach the target
	}

	return years
}