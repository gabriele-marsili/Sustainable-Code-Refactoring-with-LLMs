package change

import "errors"

func Change(coins []int, target int) (result []int, err error) {
	if target == 0 {
		return []int{}, nil
	}
	
	if len(coins) == 0 {
		return nil, errors.New("Could not make change")
	}
	
	// Use dynamic programming with memoization
	memo := make(map[int][]int)
	memo[0] = []int{}
	
	for amount := 1; amount <= target; amount++ {
		var bestChange []int
		
		for _, coin := range coins {
			if coin <= amount {
				if prevChange, exists := memo[amount-coin]; exists {
					candidate := make([]int, len(prevChange)+1)
					candidate[0] = coin
					copy(candidate[1:], prevChange)
					
					if bestChange == nil || len(candidate) < len(bestChange) {
						bestChange = candidate
					}
				}
			}
		}
		
		if bestChange != nil {
			memo[amount] = bestChange
		}
	}
	
	if result, exists := memo[target]; exists {
		return result, nil
	}
	
	return nil, errors.New("Could not make change")
}