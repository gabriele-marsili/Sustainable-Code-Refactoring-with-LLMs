package poker

import (
	"errors"
	"sort"
	"strings"
)

// HandRank represents the rank of a poker hand.
type HandRank int

const (
	HighCard HandRank = iota
	Pair
	TwoPair
	ThreeOfAKind
	Straight
	Flush
	FullHouse
	FourOfAKind
	StraightFlush
	RoyalFlush
)

// Card represents a playing card.
type Card struct {
	Rank int
	Suit rune
}

// handAnalysis stores the analysis of a hand.
type handAnalysis struct {
	rank      HandRank
	highCards []int
}

// cardValues maps card ranks to integer values.
var cardValues = map[rune]int{
	'2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9,
	'T': 10, 'J': 11, 'Q': 12, 'K': 13, 'A': 14,
}

// parseHand parses a hand string into a slice of Card structs.
func parseHand(hand string) ([]Card, error) {
	cards := make([]Card, 5)
	parts := strings.Split(hand, " ")
	if len(parts) != 5 {
		return nil, errors.New("invalid hand: must contain 5 cards")
	}

	for i, part := range parts {
		if len(part) != 2 {
			return nil, errors.New("invalid card: must be 2 characters")
		}
		rankRune := rune(part[0])
		suitRune := rune(part[1])

		rank, ok := cardValues[rankRune]
		if !ok {
			return nil, errors.New("invalid card rank")
		}

		cards[i] = Card{Rank: rank, Suit: suitRune}
	}

	return cards, nil
}

// evaluateHand evaluates a hand and returns its rank and high cards.
func evaluateHand(cards []Card) handAnalysis {
	sort.Slice(cards, func(i, j int) bool {
		return cards[i].Rank < cards[j].Rank
	})

	ranks := make([]int, 5)
	suits := make([]rune, 5)
	for i, card := range cards {
		ranks[i] = card.Rank
		suits[i] = card.Suit
	}

	isFlush := true
	for i := 1; i < 5; i++ {
		if suits[i] != suits[0] {
			isFlush = false
			break
		}
	}

	isStraight := true
	for i := 1; i < 5; i++ {
		if ranks[i] != ranks[i-1]+1 {
			isStraight = false
			break
		}
	}

	if ranks[0] == 2 && ranks[1] == 3 && ranks[2] == 4 && ranks[3] == 5 && ranks[4] == 14 {
		isStraight = true
		ranks[4] = 5 // Treat Ace as 1 for low straight
		sort.Ints(ranks)
	}

	if isStraight && isFlush && ranks[4] == 14 {
		return handAnalysis{rank: RoyalFlush, highCards: ranks}
	}

	if isStraight && isFlush {
		return handAnalysis{rank: StraightFlush, highCards: ranks}
	}

	rankCounts := make(map[int]int)
	for _, rank := range ranks {
		rankCounts[rank]++
	}

	var pairs, threeOfAKinds, fourOfAKinds int
	for _, count := range rankCounts {
		if count == 2 {
			pairs++
		} else if count == 3 {
			threeOfAKinds++
		} else if count == 4 {
			fourOfAKinds++
		}
	}

	if fourOfAKinds == 1 {
		highCards := make([]int, 0, 1)
		for rank, count := range rankCounts {
			if count != 4 {
				highCards = append(highCards, rank)
			}
		}
		return handAnalysis{rank: FourOfAKind, highCards: ranks}
	}

	if threeOfAKinds == 1 && pairs == 1 {
		return handAnalysis{rank: FullHouse, highCards: ranks}
	}

	if isFlush {
		return handAnalysis{rank: Flush, highCards: ranks}
	}

	if isStraight {
		return handAnalysis{rank: Straight, highCards: ranks}
	}

	if threeOfAKinds == 1 {
		return handAnalysis{rank: ThreeOfAKind, highCards: ranks}
	}

	if pairs == 2 {
		return handAnalysis{rank: TwoPair, highCards: ranks}
	}

	if pairs == 1 {
		return handAnalysis{rank: Pair, highCards: ranks}
	}

	return handAnalysis{rank: HighCard, highCards: ranks}
}

// compareHands compares two hands and returns 1 if hand1 is better, -1 if hand2 is better, and 0 if they are equal.
func compareHands(hand1Analysis, hand2Analysis handAnalysis) int {
	if hand1Analysis.rank > hand2Analysis.rank {
		return 1
	} else if hand1Analysis.rank < hand2Analysis.rank {
		return -1
	}

	for i := len(hand1Analysis.highCards) - 1; i >= 0; i-- {
		if hand1Analysis.highCards[i] > hand2Analysis.highCards[i] {
			return 1
		} else if hand1Analysis.highCards[i] < hand2Analysis.highCards[i] {
			return -1
		}
	}

	return 0
}

// BestHand determines the best hand from a list of hands.
func BestHand(hands []string) ([]string, error) {
	if len(hands) == 0 {
		return []string{}, nil
	}

	bestHands := []string{hands[0]}
	bestHandCards, err := parseHand(hands[0])
	if err != nil {
		return nil, err
	}
	bestHandAnalysis := evaluateHand(bestHandCards)

	for i := 1; i < len(hands); i++ {
		currentHand := hands[i]
		currentHandCards, err := parseHand(currentHand)
		if err != nil {
			return nil, err
		}
		currentHandAnalysis := evaluateHand(currentHandCards)

		comparison := compareHands(currentHandAnalysis, bestHandAnalysis)

		if comparison > 0 {
			bestHands = []string{currentHand}
			bestHandAnalysis = currentHandAnalysis
		} else if comparison == 0 {
			bestHands = append(bestHands, currentHand)
		}
	}

	return bestHands, nil
}