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

	if len(hands) == 1 {
		return []string{hands[0].rawHand}, nil
	}

	sort.Sort(ByScore(hands))
	bestHand := hands[len(hands)-1]

	bestHands = make([]string, 0, len(hands))
	for i := len(hands) - 1; i >= 0; i-- {
		comparison, err := bestHand.compare(hands[i])
		if err != nil {
			return bestHands, err
		}
		if comparison == 0 {
			bestHands = append(bestHands, hands[i].rawHand)
		} else {
			break
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