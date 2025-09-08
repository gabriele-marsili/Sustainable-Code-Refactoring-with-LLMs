package poker

import (
	"errors"
	"sort"
	"strings"
)

type Card struct {
	Rank  int
	Suit  rune
	Value int
}

func parseCard(s string) (Card, error) {
	if len(s) < 2 || len(s) > 3 {
		return Card{}, errors.New("invalid card format")
	}

	rankStr := s[:len(s)-1]
	suit := rune(s[len(s)-1])

	var rank int
	switch rankStr {
	case "2", "3", "4", "5", "6", "7", "8", "9":
		rank = int(rankStr[0] - '0')
	case "T":
		rank = 10
	case "J":
		rank = 11
	case "Q":
		rank = 12
	case "K":
		rank = 13
	case "A":
		rank = 14
	default:
		return Card{}, errors.New("invalid rank")
	}

	switch suit {
	case 'C', 'D', 'H', 'S':
	default:
		return Card{}, errors.New("invalid suit")
	}

	value := rank
	return Card{Rank: rank, Suit: suit, Value: value}, nil
}

func evaluateHand(hand []Card) int {
	sort.Slice(hand, func(i, j int) bool {
		return hand[i].Rank < hand[j].Rank
	})

	isFlush := true
	for i := 1; i < len(hand); i++ {
		if hand[i].Suit != hand[0].Suit {
			isFlush = false
			break
		}
	}

	isStraight := true
	for i := 1; i < len(hand); i++ {
		if hand[i].Rank != hand[i-1].Rank+1 {
			isStraight = false
			break
		}
	}

	if hand[0].Rank == 2 && hand[1].Rank == 3 && hand[2].Rank == 4 && hand[3].Rank == 5 && hand[4].Rank == 14 {
		isStraight = true
		hand[4].Rank = 1
		sort.Slice(hand, func(i, j int) bool {
			return hand[i].Rank < hand[j].Rank
		})
	}

	if isStraight && isFlush {
		if hand[4].Rank == 14 {
			return 10 // Royal Flush
		}
		return 9 // Straight Flush
	}

	rankCounts := make(map[int]int)
	for _, card := range hand {
		rankCounts[card.Rank]++
	}

	hasFourOfAKind := false
	hasThreeOfAKind := false
	hasPair := false
	pairCount := 0

	for _, count := range rankCounts {
		if count == 4 {
			hasFourOfAKind = true
		} else if count == 3 {
			hasThreeOfAKind = true
		} else if count == 2 {
			hasPair = true
			pairCount++
		}
	}

	if hasFourOfAKind {
		return 8 // Four of a Kind
	}

	if hasThreeOfAKind && hasPair {
		return 7 // Full House
	}

	if isFlush {
		return 6 // Flush
	}

	if isStraight {
		return 5 // Straight
	}

	if hasThreeOfAKind {
		return 4 // Three of a Kind
	}

	if pairCount == 2 {
		return 3 // Two Pair
	}

	if hasPair {
		return 2 // One Pair
	}

	return 1 // High Card
}

func BestHand(hands []string) ([]string, error) {
	if len(hands) == 0 {
		return []string{}, errors.New("no hands provided")
	}

	bestHands := []string{}
	bestScore := 0

	for _, handStr := range hands {
		cardsStr := strings.Split(handStr, " ")
		if len(cardsStr) != 5 {
			return []string{}, errors.New("invalid hand format")
		}

		hand := make([]Card, 5)
		for i, cardStr := range cardsStr {
			card, err := parseCard(cardStr)
			if err != nil {
				return []string{}, err
			}
			hand[i] = card
		}

		score := evaluateHand(hand)

		if score > bestScore {
			bestScore = score
			bestHands = []string{handStr}
		} else if score == bestScore {
			bestHands = append(bestHands, handStr)
		}
	}

	return bestHands, nil
}