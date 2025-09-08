package poker

import (
	"sort"
)

type HandType int

const (
	Nothing HandType = iota
	Pair
	TwoPairs
	ThreeOfKind
	Straight
	Flush
	FullHouse
	FourOfKind
	StraightFlush
)

func BestHand(rawHands []string) (bestHands []string, err error) {
	hands, err := parseHands(rawHands)
	if err != nil {
		return nil, err
	}

	if len(hands) == 0 {
		return []string{}, nil
	}

	bestHand := getBestHandOptimized(hands)

	for _, hand := range hands {
		comparison, err := bestHand.compare(hand)
		if err != nil {
			return nil, err
		}
		if comparison == 0 {
			bestHands = append(bestHands, hand.rawHand)
		}
	}

	return bestHands, nil
}

func getBestHandOptimized(hands []Hand) Hand {
	if len(hands) == 0 {
		return Hand{} // Or handle this case appropriately
	}

	bestHand := hands[0]
	for i := 1; i < len(hands); i++ {
		comparison, _ := bestHand.compare(hands[i])
		if comparison < 0 {
			bestHand = hands[i]
		}
	}
	return bestHand
}

func getBestHand(rawHands []string) (bestHand Hand, err error) {
	hands, err := parseHands(rawHands)
	if err != nil {
		return Hand{}, err
	}

	sort.Sort(ByScore(hands))

	bestHand = hands[len(hands)-1]
	return bestHand, nil
}