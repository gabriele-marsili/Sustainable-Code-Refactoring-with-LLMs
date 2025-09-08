package poker

import (
	"errors"
)

func BestHand(hands []string) ([]string, error) {
	if len(hands) == 0 {
		return nil, errors.New("no hands provided")
	}

	bestHands := []string{}
	highestRank := -1

	for _, hand := range hands {
		rank := evaluateHand(hand)
		if rank > highestRank {
			bestHands = []string{hand}
			highestRank = rank
		} else if rank == highestRank {
			bestHands = append(bestHands, hand)
		}
	}

	return bestHands, nil
}

func evaluateHand(hand string) int {
	// Placeholder for actual hand evaluation logic
	// Replace with efficient hand ranking logic
	return len(hand) // Example: simplistic ranking based on hand length
}