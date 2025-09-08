package poker

import (
	"fmt"
	"sort"
	"strings"
)

// Card represents a playing card with rank and suit.
type Card struct {
	Rank  int
	Suit  rune
	Label string
}

// HandRank represents the rank of a poker hand.
type HandRank int

const (
	HighCard HandRank = iota
	OnePair
	TwoPair
	ThreeOfAKind
	Straight
	Flush
	FullHouse
	FourOfAKind
	StraightFlush
	RoyalFlush
)

// rankMap maps card labels to integer ranks.
var rankMap = map[rune]int{
	'2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9,
	'T': 10, 'J': 11, 'Q': 12, 'K': 13, 'A': 14,
}

// evaluateHand evaluates a hand of cards and returns its rank and high cards.
func evaluateHand(cards []Card) (HandRank, []int) {
	ranks := make([]int, len(cards))
	suits := make([]rune, len(cards))
	for i, card := range cards {
		ranks[i] = card.Rank
		suits[i] = card.Suit
	}

	sort.Ints(ranks)

	isFlush := true
	for i := 1; i < len(suits); i++ {
		if suits[i] != suits[0] {
			isFlush = false
			break
		}
	}

	isStraight := true
	for i := 1; i < len(ranks); i++ {
		if ranks[i] != ranks[i-1]+1 {
			isStraight = false
			break
		}
	}

	if ranks[0] == 10 && isStraight && isFlush {
		return RoyalFlush, ranks
	}

	if isStraight && isFlush {
		return StraightFlush, ranks
	}

	rankCounts := make(map[int]int)
	for _, rank := range ranks {
		rankCounts[rank]++
	}

	hasFourOfAKind := false
	hasThreeOfAKind := false
	hasPair := false
	pairs := 0
	for _, count := range rankCounts {
		if count == 4 {
			hasFourOfAKind = true
		} else if count == 3 {
			hasThreeOfAKind = true
		} else if count == 2 {
			hasPair = true
			pairs++
		}
	}

	if hasFourOfAKind {
		return FourOfAKind, ranks
	}

	if hasThreeOfAKind && hasPair {
		return FullHouse, ranks
	}

	if isFlush {
		return Flush, ranks
	}

	if isStraight {
		return Straight, ranks
	}

	if hasThreeOfAKind {
		return ThreeOfAKind, ranks
	}

	if pairs == 2 {
		return TwoPair, ranks
	}

	if hasPair {
		return OnePair, ranks
	}

	return HighCard, ranks
}

// parseHand parses a hand string into a slice of Card structs.
func parseHand(hand string) ([]Card, error) {
	cardStrings := strings.Split(hand, " ")
	cards := make([]Card, len(cardStrings))
	for i, cardString := range cardStrings {
		if len(cardString) < 2 {
			return nil, fmt.Errorf("invalid card: %s", cardString)
		}
		rankRune := rune(cardString[0])
		suitRune := rune(cardString[1])

		rank, ok := rankMap[rankRune]
		if !ok {
			return nil, fmt.Errorf("invalid rank: %c", rankRune)
		}

		cards[i] = Card{Rank: rank, Suit: suitRune, Label: cardString}
	}
	return cards, nil
}

// BestHand determines the best poker hand from a list of hands.
func BestHand(hands []string) ([]string, error) {
	if len(hands) == 0 {
		return []string{}, nil
	}

	bestRank := HighCard
	var bestHand []string
	var bestHighCards []int

	for _, hand := range hands {
		cards, err := parseHand(hand)
		if err != nil {
			return nil, err
		}

		rank, highCards := evaluateHand(cards)

		if rank > bestRank {
			bestRank = rank
			bestHand = []string{hand}
			bestHighCards = highCards
		} else if rank == bestRank {
			// Compare high cards
			tie := false
			for i := len(highCards) - 1; i >= 0; i-- {
				if highCards[i] > bestHighCards[i] {
					bestHand = []string{hand}
					bestHighCards = highCards
					tie = false
					break
				} else if highCards[i] < bestHighCards[i] {
					tie = false
					break
				} else {
					tie = true
				}
			}
			if tie {
				bestHand = append(bestHand, hand)
			}
		}
	}

	sort.Strings(bestHand)
	return bestHand, nil
}