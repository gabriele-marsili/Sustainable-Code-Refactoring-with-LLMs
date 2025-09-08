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
	if len(rawHands) == 0 {
		return []string{}, nil
	}

	hands, err := parseHands(rawHands)
	if err != nil {
		return []string{}, err
	}

	bestHand, err := findBestHand(hands)
	if err != nil {
		return []string{}, err
	}

	fmt.Printf("bestHand %v\n", bestHand)

	for _, hand := range hands {
		comparison, err := bestHand.compare(hand)
		if err != nil {
			return []string{}, err
		}
		if comparison == 0 {
			bestHands = append(bestHands, hand.rawHand)
		}
	}

	return bestHands, nil
}

func findBestHand(hands []Hand) (bestHand Hand, err error) {
	if len(hands) == 0 {
		return Hand{}, fmt.Errorf("no hands to evaluate")
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

func parseHands(rawHands []string) ([]Hand, error) {
	hands := make([]Hand, len(rawHands))
	var err error
	for i, rawHand := range rawHands {
		hands[i], err = parseHand(rawHand)
		if err != nil {
			return nil, err
		}
	}
	return hands, nil
}

// ByScore implements sort.Interface based on the Score method.
type ByScore []Hand

func (a ByScore) Len() int           { return len(a) }
func (a ByScore) Less(i, j int) bool { comparison, _ := a[i].compare(a[j]); return comparison < 0 }
func (a ByScore) Swap(i, j int)      { a[i], a[j] = a[j], a[i] }