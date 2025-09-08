package prime

func IsPrime(x int) bool {
	if x < 2 {
		return false
	}
	if x == 2 {
		return true
	}
	if x%2 == 0 {
		return false
	}
	
	for i := 3; i*i <= x; i += 2 {
		if x%i == 0 {
			return false
		}
	}
	return true
}

func Nth(n int) (int, bool) {
	if n < 1 {
		return 0, false
	}
	if n == 1 {
		return 2, true
	}
	
	count := 1
	candidate := 3
	
	for count < n {
		if IsPrime(candidate) {
			count++
			if count == n {
				return candidate, true
			}
		}
		candidate += 2
	}
	return 0, false
}