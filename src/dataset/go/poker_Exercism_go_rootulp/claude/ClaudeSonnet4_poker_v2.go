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
		return nil, nil
	}

	// Find best hand without creating a separate function
	bestHand := hands[0]
	for i := 1; i < len(hands); i++ {
		comparison, err := hands[i].compare(bestHand)
		if err != nil {
			return nil, err
		}
		if comparison > 0 {
			bestHand = hands[i]
		}
	}

	// Pre-allocate slice with estimated capacity
	bestHands = make([]string, 0, len(hands))
	
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

func getBestHand(rawHands []string) (bestHand Hand, err error) {
	hands, err := parseHands(rawHands)
	if err != nil {
		return Hand{}, err
	}

	sort.Sort(ByScore(hands))

	bestHand = hands[len(hands)-1]
	return bestHand, nil
}