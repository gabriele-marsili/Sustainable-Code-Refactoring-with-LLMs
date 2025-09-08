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
	if len(rawHands) == 0 {
		return bestHands, nil
	}

	hands, err := parseHands(rawHands)
	if err != nil {
		return bestHands, err
	}

	bestHand := hands[0]
	for i := 1; i < len(hands); i++ {
		comparison, err := bestHand.compare(hands[i])
		if err != nil {
			return bestHands, err
		}
		if comparison < 0 {
			bestHand = hands[i]
		}
	}

	bestHands = make([]string, 0, len(rawHands))
	for i, hand := range hands {
		comparison, err := bestHand.compare(hand)
		if err != nil {
			return bestHands, err
		}
		if comparison == 0 {
			bestHands = append(bestHands, rawHands[i])
		}
	}

	return bestHands, nil
}

func getBestHand(rawHands []string) (bestHand Hand, err error) {
	if len(rawHands) == 0 {
		return Hand{}, nil
	}

	hands, err := parseHands(rawHands)
	if err != nil {
		return Hand{}, err
	}

	bestHand = hands[0]
	for i := 1; i < len(hands); i++ {
		comparison, err := bestHand.compare(hands[i])
		if err != nil {
			return Hand{}, err
		}
		if comparison < 0 {
			bestHand = hands[i]
		}
	}

	return bestHand, nil
}