package change

import (
	"errors"
	"sort"
)

type State struct {
	remaining int
	coins     []int
	change    []int
}

func Change(coins []int, target int) ([]int, error) {
	if target == 0 {
		return []int{}, nil
	}

	sort.Sort(sort.Reverse(sort.IntSlice(coins)))
	var result []int
	queue := []State{{remaining: target, coins: coins, change: nil}}

	for len(queue) > 0 {
		state := queue[len(queue)-1]
		queue = queue[:len(queue)-1]

		if state.remaining == 0 {
			if len(result) == 0 || len(state.change) < len(result) {
				result = append([]int(nil), state.change...)
			}
			continue
		}

		if state.remaining < 0 || len(state.coins) == 0 || (len(result) > 0 && len(state.change) >= len(result)) {
			continue
		}

		coin := state.coins[0]
		queue = append(queue, State{
			remaining: state.remaining - coin,
			coins:     state.coins,
			change:    append(state.change, coin),
		})
		queue = append(queue, State{
			remaining: state.remaining,
			coins:     state.coins[1:],
			change:    state.change,
		})
	}

	if len(result) == 0 {
		return nil, errors.New("could not make change")
	}
	return result, nil
}