package poker

import (
	"errors"
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

func BestHand(rawHands []string) ([]string, error) {
	hands, err := parseHands(rawHands)
	if err != nil {
		return nil, err
	}

	bestHand, err := getBestHand(hands)
	if err != nil {
		return nil, err
	}

	var bestHands []string
	for _, hand := range hands {
		if comparison, _ := bestHand.compare(hand); comparison == 0 {
			bestHands = append(bestHands, hand.rawHand)
		}
	}

	return bestHands, nil
}

func getBestHand(hands []Hand) (Hand, error) {
	if len(hands) == 0 {
		return Hand{}, errors.New("no hands provided")
	}

	sort.Sort(ByScore(hands))
	return hands[len(hands)-1], nil
}