package sieve

func Sieve(limit int) []int {
	if limit < 2 {
		return []int{}
	}
	
	isPrime := make([]bool, limit+1)
	for i := 2; i <= limit; i++ {
		isPrime[i] = true
	}
	
	for i := 2; i*i <= limit; i++ {
		if isPrime[i] {
			for j := i * i; j <= limit; j += i {
				isPrime[j] = false
			}
		}
	}
	
	primes := make([]int, 0, limit/10)
	for i := 2; i <= limit; i++ {
		if isPrime[i] {
			primes = append(primes, i)
		}
	}
	
	return primes
}

func generateNums(limit int) []nums {
	numArrays := make([]nums, 0, limit-1)
	for i := 2; i <= limit; i++ {
		currentNum := nums{value: i, numtype: "tbd"}
		numArrays = append(numArrays, currentNum)
	}
	return numArrays
}

func filterprimes(numArray []nums) []int {
	primes := make([]int, 0, len(numArray)/4)
	for i := 0; i < len(numArray); i++ {
		if numArray[i].numtype == "prime" {
			primes = append(primes, numArray[i].value)
		}
	}
	return primes
}

type nums struct {
	value   int
	numtype string
}