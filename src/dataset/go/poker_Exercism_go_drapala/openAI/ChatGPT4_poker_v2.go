package poker

import (
	"errors"
	"sort"
)

func BestHand(hands []string) ([]string, error) {
	if len(hands) == 0 {
		return nil, errors.New("no hands provided")
	}

	type handRank struct {
		hand string
		rank int
	}

	rankHand := func(hand string) int {
		// Simplified ranking logic for demonstration purposes
		// Replace with actual poker hand ranking logic
		return len(hand) // Example: rank based on hand length
	}

	rankedHands := make([]handRank, len(hands))
	for i, hand := range hands {
		rankedHands[i] = handRank{hand: hand, rank: rankHand(hand)}
	}

	sort.Slice(rankedHands, func(i, j int) bool {
		return rankedHands[i].rank > rankedHands[j].rank
	})

	bestRank := rankedHands[0].rank
	bestHands := []string{}
	for _, h := range rankedHands {
		if h.rank == bestRank {
			bestHands = append(bestHands, h.hand)
		} else {
			break
		}
	}

	return bestHands, nil
}