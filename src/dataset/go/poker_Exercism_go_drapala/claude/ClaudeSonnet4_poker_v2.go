package poker

import (
	"errors"
	"sort"
	"strconv"
	"strings"
)

type hand struct {
	cards []card
	rank  int
	value []int
}

type card struct {
	rank int
	suit rune
}

var rankMap = map[rune]int{
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

	bestRank := -1
	var bestValue []int
	
	for i := range parsedHands {
		if parsedHands[i].rank > bestRank || 
		   (parsedHands[i].rank == bestRank && compareValues(parsedHands[i].value, bestValue) > 0) {
			bestRank = parsedHands[i].rank
			bestValue = parsedHands[i].value
		}
	}

	result := make([]string, 0, len(hands))
	for i, h := range parsedHands {
		if h.rank == bestRank && compareValues(h.value, bestValue) == 0 {
			result = append(result, hands[i])
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
		
		rank, ok := rankMap[rune(cardStr[0])]
		if !ok {
			return hand{}, errors.New("invalid rank")
		}
		
		cards[i] = card{rank: rank, suit: rune(cardStr[1])}
	}

	sort.Slice(cards, func(i, j int) bool {
		return cards[i].rank < cards[j].rank
	})

	h := hand{cards: cards}
	h.rank, h.value = evaluateHand(cards)
	return h, nil
}

func evaluateHand(cards []card) (int, []int) {
	ranks := make([]int, 5)
	suits := make([]rune, 5)
	rankCounts := make(map[int]int)
	
	for i, c := range cards {
		ranks[i] = c.rank
		suits[i] = c.suit
		rankCounts[c.rank]++
	}

	isFlush := suits[0] == suits[1] && suits[1] == suits[2] && suits[2] == suits[3] && suits[3] == suits[4]
	isStraight := ranks[4]-ranks[0] == 4 && len(rankCounts) == 5
	
	// Check for A-2-3-4-5 straight (wheel)
	if !isStraight && ranks[0] == 2 && ranks[1] == 3 && ranks[2] == 4 && ranks[3] == 5 && ranks[4] == 14 {
		isStraight = true
		ranks = []int{1, 2, 3, 4, 5} // Treat ace as 1 for wheel
	}

	counts := make([]int, 0, 4)
	for _, count := range rankCounts {
		counts = append(counts, count)
	}
	sort.Sort(sort.Reverse(sort.IntSlice(counts)))

	switch {
	case isStraight && isFlush:
		return 8, []int{ranks[4]} // Straight flush
	case counts[0] == 4:
		return 7, getFourOfAKindValue(rankCounts) // Four of a kind
	case counts[0] == 3 && counts[1] == 2:
		return 6, getFullHouseValue(rankCounts) // Full house
	case isFlush:
		return 5, reverseSlice(ranks) // Flush
	case isStraight:
		return 4, []int{ranks[4]} // Straight
	case counts[0] == 3:
		return 3, getThreeOfAKindValue(rankCounts) // Three of a kind
	case counts[0] == 2 && counts[1] == 2:
		return 2, getTwoPairValue(rankCounts) // Two pair
	case counts[0] == 2:
		return 1, getOnePairValue(rankCounts) // One pair
	default:
		return 0, reverseSlice(ranks) // High card
	}
}

func getFourOfAKindValue(rankCounts map[int]int) []int {
	var four, one int
	for rank, count := range rankCounts {
		if count == 4 {
			four = rank
		} else {
			one = rank
		}
	}
	return []int{four, one}
}

func getFullHouseValue(rankCounts map[int]int) []int {
	var three, two int
	for rank, count := range rankCounts {
		if count == 3 {
			three = rank
		} else {
			two = rank
		}
	}
	return []int{three, two}
}

func getThreeOfAKindValue(rankCounts map[int]int) []int {
	var three int
	kickers := make([]int, 0, 2)
	for rank, count := range rankCounts {
		if count == 3 {
			three = rank
		} else {
			kickers = append(kickers, rank)
		}
	}
	sort.Sort(sort.Reverse(sort.IntSlice(kickers)))
	return append([]int{three}, kickers...)
}

func getTwoPairValue(rankCounts map[int]int) []int {
	pairs := make([]int, 0, 2)
	var kicker int
	for rank, count := range rankCounts {
		if count == 2 {
			pairs = append(pairs, rank)
		} else {
			kicker = rank
		}
	}
	sort.Sort(sort.Reverse(sort.IntSlice(pairs)))
	return append(pairs, kicker)
}

func getOnePairValue(rankCounts map[int]int) []int {
	var pair int
	kickers := make([]int, 0, 3)
	for rank, count := range rankCounts {
		if count == 2 {
			pair = rank
		} else {
			kickers = append(kickers, rank)
		}
	}
	sort.Sort(sort.Reverse(sort.IntSlice(kickers)))
	return append([]int{pair}, kickers...)
}

func reverseSlice(s []int) []int {
	result := make([]int, len(s))
	for i, v := range s {
		result[len(s)-1-i] = v
	}
	return result
}

func compareValues(a, b []int) int {
	for i := 0; i < len(a) && i < len(b); i++ {
		if a[i] > b[i] {
			return 1
		} else if a[i] < b[i] {
			return -1
		}
	}
	return 0
}