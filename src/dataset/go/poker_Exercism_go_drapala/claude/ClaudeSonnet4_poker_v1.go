package poker

import (
	"errors"
	"sort"
	"strconv"
	"strings"
)

type hand struct {
	cards    []card
	original string
	rank     int
	tiebreak []int
}

type card struct {
	value int
	suit  rune
}

var valueMap = map[rune]int{
	'2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9,
	'T': 10, 'J': 11, 'Q': 12, 'K': 13, 'A': 14,
}

func BestHand(hands []string) ([]string, error) {
	if len(hands) == 0 {
		return nil, errors.New("no hands provided")
	}

	parsedHands := make([]hand, len(hands))
	
	for i, handStr := range hands {
		h, err := parseHand(handStr)
		if err != nil {
			return nil, err
		}
		parsedHands[i] = h
	}

	bestRank := 0
	for _, h := range parsedHands {
		if h.rank > bestRank {
			bestRank = h.rank
		}
	}

	var winners []hand
	for _, h := range parsedHands {
		if h.rank == bestRank {
			winners = append(winners, h)
		}
	}

	if len(winners) == 1 {
		return []string{winners[0].original}, nil
	}

	sort.Slice(winners, func(i, j int) bool {
		for k := 0; k < len(winners[i].tiebreak) && k < len(winners[j].tiebreak); k++ {
			if winners[i].tiebreak[k] != winners[j].tiebreak[k] {
				return winners[i].tiebreak[k] > winners[j].tiebreak[k]
			}
		}
		return false
	})

	result := []string{winners[0].original}
	for i := 1; i < len(winners); i++ {
		if equalTiebreak(winners[0].tiebreak, winners[i].tiebreak) {
			result = append(result, winners[i].original)
		} else {
			break
		}
	}

	return result, nil
}

func parseHand(handStr string) (hand, error) {
	cardStrs := strings.Fields(handStr)
	if len(cardStrs) != 5 {
		return hand{}, errors.New("invalid hand size")
	}

	cards := make([]card, 5)
	for i, cardStr := range cardStrs {
		if len(cardStr) != 2 {
			return hand{}, errors.New("invalid card format")
		}
		
		value, exists := valueMap[rune(cardStr[0])]
		if !exists {
			return hand{}, errors.New("invalid card value")
		}
		
		cards[i] = card{value: value, suit: rune(cardStr[1])}
	}

	sort.Slice(cards, func(i, j int) bool {
		return cards[i].value > cards[j].value
	})

	rank, tiebreak := evaluateHand(cards)
	return hand{cards: cards, original: handStr, rank: rank, tiebreak: tiebreak}, nil
}

func evaluateHand(cards []card) (int, []int) {
	values := make([]int, 5)
	suits := make([]rune, 5)
	for i, c := range cards {
		values[i] = c.value
		suits[i] = c.suit
	}

	isFlush := suits[0] == suits[1] && suits[1] == suits[2] && suits[2] == suits[3] && suits[3] == suits[4]
	isStraight := values[0] == values[1]+1 && values[1] == values[2]+1 && values[2] == values[3]+1 && values[3] == values[4]+1
	
	// Special case: A-2-3-4-5 straight
	if !isStraight && values[0] == 14 && values[1] == 5 && values[2] == 4 && values[3] == 3 && values[4] == 2 {
		isStraight = true
		values = []int{5, 4, 3, 2, 1} // Ace low
	}

	counts := make(map[int]int)
	for _, v := range values {
		counts[v]++
	}

	var pairs []int
	var trips, quads int
	for value, count := range counts {
		switch count {
		case 2:
			pairs = append(pairs, value)
		case 3:
			trips = value
		case 4:
			quads = value
		}
	}

	sort.Sort(sort.Reverse(sort.IntSlice(pairs)))

	// Straight flush
	if isFlush && isStraight {
		return 8, []int{values[0]}
	}
	// Four of a kind
	if quads > 0 {
		kicker := 0
		for _, v := range values {
			if v != quads {
				kicker = v
				break
			}
		}
		return 7, []int{quads, kicker}
	}
	// Full house
	if trips > 0 && len(pairs) > 0 {
		return 6, []int{trips, pairs[0]}
	}
	// Flush
	if isFlush {
		return 5, values
	}
	// Straight
	if isStraight {
		return 4, []int{values[0]}
	}
	// Three of a kind
	if trips > 0 {
		kickers := make([]int, 0, 2)
		for _, v := range values {
			if v != trips {
				kickers = append(kickers, v)
			}
		}
		return 3, append([]int{trips}, kickers...)
	}
	// Two pair
	if len(pairs) == 2 {
		kicker := 0
		for _, v := range values {
			if v != pairs[0] && v != pairs[1] {
				kicker = v
				break
			}
		}
		return 2, append(pairs, kicker)
	}
	// One pair
	if len(pairs) == 1 {
		kickers := make([]int, 0, 3)
		for _, v := range values {
			if v != pairs[0] {
				kickers = append(kickers, v)
			}
		}
		return 1, append([]int{pairs[0]}, kickers...)
	}
	// High card
	return 0, values
}

func equalTiebreak(a, b []int) bool {
	if len(a) != len(b) {
		return false
	}
	for i := range a {
		if a[i] != b[i] {
			return false
		}
	}
	return true
}