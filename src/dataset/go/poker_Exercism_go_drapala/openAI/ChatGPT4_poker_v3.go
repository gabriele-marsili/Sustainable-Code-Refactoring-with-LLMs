package poker

func BestHand(hands []string) ([]string, error) {
	if len(hands) == 0 {
		return nil, nil
	}

	bestHands := make([]string, 0, len(hands))
	highestRank := ""

	for _, hand := range hands {
		if hand > highestRank {
			highestRank = hand
			bestHands = bestHands[:0]
			bestHands = append(bestHands, hand)
		} else if hand == highestRank {
			bestHands = append(bestHands, hand)
		}
	}

	return bestHands, nil
}