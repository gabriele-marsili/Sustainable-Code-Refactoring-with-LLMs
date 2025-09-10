package change

import "errors"

type State struct {
	remaining int
	coins     []int
	change    []int
}

func Change(coins []int, target int) (result []int, err error) {
	var dfs func(remaining int, coins []int, change []int)
	dfs = func(remaining int, coins []int, change []int) {
		if remaining == 0 {
			if len(result) == 0 || len(change) < len(result) {
				result = append([]int{}, change...)
			}
			return
		}
		if remaining < 0 || len(coins) == 0 || (len(result) > 0 && len(change) >= len(result)) {
			return
		}
		coin := coins[len(coins)-1]
		dfs(remaining-coin, coins, append(change, coin))
		dfs(remaining, coins[:len(coins)-1], change)
	}

	dfs(target, coins, []int{})
	if len(result) == 0 && target != 0 {
		err = errors.New("Could not make change")
	}
	return
}