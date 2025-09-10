package change

import (
	"errors"
	"sort"
)

type State struct {
	remaining int
	change    []int
}

func Change(coins []int, target int) (result []int, err error) {
	sort.Sort(sort.Reverse(sort.IntSlice(coins))) // Sort coins in descending order for efficiency
	queue := []State{{remaining: target, change: []int{}}}
	visited := make(map[int]bool) // Track visited states to avoid redundant processing

	for len(queue) > 0 {
		state := queue[0]
		queue = queue[1:]

		if state.remaining == 0 {
			if len(result) == 0 || len(state.change) < len(result) {
				result = state.change
			}
			continue
		}

		if state.remaining < 0 || (len(result) > 0 && len(state.change) >= len(result)) {
			continue
		}

		if visited[state.remaining] {
			continue
		}
		visited[state.remaining] = true

		for _, coin := range coins {
			queue = append(queue, State{
				remaining: state.remaining - coin,
				change:    append([]int{coin}, state.change...),
			})
		}
	}

	if len(result) == 0 && target != 0 {
		err = errors.New("Could not make change")
	}
	return
}