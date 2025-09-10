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

	interestRate := float64(InterestRate(balance)) / 100.0

	if interestRate <= 0 {
		return 0
	}

	// Use a formula to estimate the number of years
	estimatedYears := int((ln(targetBalance) - ln(balance)) / ln(1+interestRate))

	// Adjust the estimate by simulating the balance update for a few years around the estimate
	years = estimatedYears - 5
	if years < 0 {
		years = 0
	}
	for balance <= targetBalance && years < estimatedYears+5 {
		balance = AnnualBalanceUpdate(balance)
		years++
	}

	return years
}

// ln is a helper function to calculate the natural logarithm
func ln(x float64) float64 {
	const iterations = 15
	const nearOne = 1e-8

	if x <= 0 {
		return 0 // Or return an error, depending on the desired behavior
	}

	if x > 2 {
		return ln(x/2) + 0.6931471805599453 // ln(2)
	}

	if 1-x > nearOne || x-1 > nearOne {
		sum := 0.0
		term := (x - 1) / (x + 1)
		termSq := term * term
		power := term

		for i := 1; i <= iterations; i++ {
			sum += power / float64(2*i-1)
			power *= termSq
		}
		return 2 * sum
	}

	// Use Taylor series expansion around x = 1 for values close to 1
	y := x - 1
	result := y
	for i := 2; i < 10; i++ {
		result += pow(-1, float64(i+1)) * pow(y, float64(i)) / float64(i)
	}
	return result
}

// pow is a helper function to calculate x to the power of y
func pow(x, y float64) float64 {
	result := 1.0
	for i := 0; i < int(y); i++ {
		result *= x
	}
	return result
}