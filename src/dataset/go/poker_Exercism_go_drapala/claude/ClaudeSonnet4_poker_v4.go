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
	rank int
	suit byte
}

var rankMap = map[byte]int{
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
	for i := range parsedHands {
		if parsedHands[i].rank > bestRank {
			bestRank = parsedHands[i].rank
		}
	}

	var winners []string
	for i := range parsedHands {
		if parsedHands[i].rank == bestRank {
			winners = append(winners, parsedHands[i].original)
		}
	}

	if len(winners) == 1 {
		return winners, nil
	}

	var bestHands []hand
	for i := range parsedHands {
		if parsedHands[i].rank == bestRank {
			bestHands = append(bestHands, parsedHands[i])
		}
	}

	sort.Slice(bestHands, func(i, j int) bool {
		return compareHands(bestHands[i], bestHands[j]) > 0
	})

	result := []string{bestHands[0].original}
	for i := 1; i < len(bestHands); i++ {
		if compareHands(bestHands[0], bestHands[i]) == 0 {
			result = append(result, bestHands[i].original)
		} else {
			break
		}
	}

	return result, nil
}

func parseHand(handStr string) (hand, error) {
	cards := strings.Fields(handStr)
	if len(cards) != 5 {
		return hand{}, errors.New("invalid hand: must have 5 cards")
	}

	h := hand{
		cards:    make([]card, 5),
		original: handStr,
	}

	for i, cardStr := range cards {
		if len(cardStr) != 2 {
			return hand{}, errors.New("invalid card format")
		}
		
		rank, exists := rankMap[cardStr[0]]
		if !exists {
			return hand{}, errors.New("invalid card rank")
		}
		
		suit := cardStr[1]
		if suit != 'H' && suit != 'D' && suit != 'C' && suit != 'S' {
			return hand{}, errors.New("invalid card suit")
		}
		
		h.cards[i] = card{rank: rank, suit: suit}
	}

	sort.Slice(h.cards, func(i, j int) bool {
		return h.cards[i].rank < h.cards[j].rank
	})

	h.rank, h.tiebreak = evaluateHand(h.cards)
	return h, nil
}

func evaluateHand(cards []card) (int, []int) {
	ranks := make([]int, 5)
	suits := make([]byte, 5)
	rankCounts := make(map[int]int)
	
	for i, c := range cards {
		ranks[i] = c.rank
		suits[i] = c.suit
		rankCounts[c.rank]++
	}

	isFlush := suits[0] == suits[1] && suits[1] == suits[2] && suits[2] == suits[3] && suits[3] == suits[4]
	isStraight := ranks[4]-ranks[0] == 4 && len(rankCounts) == 5
	
	if !isStraight && ranks[0] == 2 && ranks[1] == 3 && ranks[2] == 4 && ranks[3] == 5 && ranks[4] == 14 {
		isStraight = true
		ranks[4] = 1
	}

	counts := make([]int, 0, 5)
	for _, count := range rankCounts {
		counts = append(counts, count)
	}
	sort.Sort(sort.Reverse(sort.IntSlice(counts)))

	if isStraight && isFlush {
		return 8, []int{ranks[4]}
	}
	if counts[0] == 4 {
		return 7, getFourOfAKindTiebreak(rankCounts)
	}
	if counts[0] == 3 && counts[1] == 2 {
		return 6, getFullHouseTiebreak(rankCounts)
	}
	if isFlush {
		return 5, []int{ranks[4], ranks[3], ranks[2], ranks[1], ranks[0]}
	}
	if isStraight {
		return 4, []int{ranks[4]}
	}
	if counts[0] == 3 {
		return 3, getThreeOfAKindTiebreak(rankCounts)
	}
	if counts[0] == 2 && counts[1] == 2 {
		return 2, getTwoPairTiebreak(rankCounts)
	}
	if counts[0] == 2 {
		return 1, getOnePairTiebreak(rankCounts)
	}
	return 0, []int{ranks[4], ranks[3], ranks[2], ranks[1], ranks[0]}
}

func getFourOfAKindTiebreak(rankCounts map[int]int) []int {
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

func getFullHouseTiebreak(rankCounts map[int]int) []int {
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

func getThreeOfAKindTiebreak(rankCounts map[int]int) []int {
	var three int
	var kickers []int
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

func getTwoPairTiebreak(rankCounts map[int]int) []int {
	var pairs []int
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

func getOnePairTiebreak(rankCounts map[int]int) []int {
	var pair int
	var kickers []int
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

func compareHands(h1, h2 hand) int {
	if h1.rank != h2.rank {
		return h1.rank - h2.rank
	}
	
	minLen := len(h1.tiebreak)
	if len(h2.tiebreak) < minLen {
		minLen = len(h2.tiebreak)
	}
	
	for i := 0; i < minLen; i++ {
		if h1.tiebreak[i] != h2.tiebreak[i] {
			return h1.tiebreak[i] - h2.tiebreak[i]
		}
	}
	return 0
}