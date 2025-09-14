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
	var rate float64
	if balance < 0 {
		rate = 3.213
	} else if balance < 1000 {
		rate = 0.5
	} else if balance >= 5000 {
		rate = 2.475
	} else {
		rate = 1.621
	}
	return balance * rate * 0.01
}

// AnnualBalanceUpdate calculates the annual balance update, taking into account the interest rate.
func AnnualBalanceUpdate(balance float64) float64 {
	var rate float64
	if balance < 0 {
		rate = 3.213
	} else if balance < 1000 {
		rate = 0.5
	} else if balance >= 5000 {
		rate = 2.475
	} else {
		rate = 1.621
	}
	return balance * (1 + rate*0.01)
}

// YearsBeforeDesiredBalance calculates the minimum number of years required to reach the desired balance:
func YearsBeforeDesiredBalance(balance, targetBalance float64) int {
	if balance >= targetBalance {
		return 0
	}
	
	years := 0
	for balance < targetBalance {
		var rate float64
		if balance < 0 {
			rate = 3.213
		} else if balance < 1000 {
			rate = 0.5
		} else if balance >= 5000 {
			rate = 2.475
		} else {
			rate = 1.621
		}
		balance *= (1 + rate*0.01)
		years++
	}
	return years
}