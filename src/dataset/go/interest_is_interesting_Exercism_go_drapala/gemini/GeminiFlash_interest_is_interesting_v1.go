package interest

// InterestRate returns the interest rate for the provided balance.
func InterestRate(balance float64) float32 {
	if balance < 0 {
		return 3.213
	}
	if balance < 1000 {
		return 0.5
	}
	if balance < 5000 {
		return 1.621
	}
	return 2.475
}

// Interest calculates the interest for the provided balance.
func Interest(balance float64) float64 {
	return float64(InterestRate(balance)) * balance / 100.0
}

// AnnualBalanceUpdate calculates the annual balance update, taking into account the interest rate.
func AnnualBalanceUpdate(balance float64) float64 {
	return balance + Interest(balance)
}

// YearsBeforeDesiredBalance calculates the minimum number of years required to reach the desired balance:
func YearsBeforeDesiredBalance(balance, targetBalance float64) int {
	years := 0
	if balance >= targetBalance {
		return years
	}

	rate := float64(InterestRate(balance)) / 100.0

	if rate <= 0 {
		return -1 // or handle appropriately, indicating impossible to reach target
	}

	// Estimate years using logarithm
	estimatedYears := int((ln(targetBalance/balance) / ln(1+rate)))

	// Adjust years if estimate is off
	for i := 0; i < estimatedYears+2; i++ {
		balance = AnnualBalanceUpdate(balance)
		years++
		if balance > targetBalance {
			return years
		}
	}

	// Fallback to iterative approach if estimate fails
	for balance <= targetBalance {
		balance = AnnualBalanceUpdate(balance)
		years++
	}

	return years
}

// ln is a more efficient approximation of the natural logarithm
func ln(x float64) float64 {
	const (
		ln2  = 0.6931471805599453 // log(2)
		a    = 0.3535533905932738 // 1/sqrt(2)
		high = 1.0 / 0.3535533905932738
	)

	if x <= 0 {
		return -1e100 // or math.Inf(-1)
	}

	var k int
	for x > high {
		x *= a
		k++
	}
	for x < a {
		x /= a
		k--
	}

	x -= 1
	sq := x * x
	series := x - 0.5*sq + x*sq/3 - x*sq*x/4 + x*sq*sq/5 - x*sq*sq*x/6
	return series + float64(k)*ln2
}