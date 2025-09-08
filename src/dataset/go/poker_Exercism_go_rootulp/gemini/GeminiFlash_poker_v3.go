package poker

import (
	"fmt"
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

	bestHand, err := getBestHandFromParsed(hands)
	if err != nil {
		return nil, err
	}

	fmt.Printf("bestHand %v\n", bestHand)

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
	return getBestHandFromParsed(hands)
}

func getBestHandFromParsed(hands []Hand) (bestHand Hand, err error) {
	sort.Sort(ByScore(hands))
	fmt.Printf("sortedHands %v\n", hands)

	bestHand = hands[len(hands)-1]
	return bestHand, nil
}