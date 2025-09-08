package poker

import (
	"fmt"
	"sort"
	"strings"
)

const TestVersion = 1

const (
	highCard = iota
	onePair
	twoPair
	threeOfAKind
	straight
	flush
	fullHouse
	fourOfAKind
	straightFlush
)

var rankMap = map[string]int{
	"A": 14, "2": 2, "3": 3, "4": 4, "5": 5, "6": 6, "7": 7, "8": 8, "9": 9, "10": 10, "J": 11, "Q": 12, "K": 13,
}

var validSuits = map[rune]bool{'♡': true, '♢': true, '♧': true, '♤': true}

func BestHand(hands []string) ([]string, error) {
	if len(hands) == 0 {
		return nil, nil
	}

	bestHand := make([]string, 0, len(hands))
	var bestHandRank [6]int

	for _, hand := range hands {
		ranks, suits, err := getCards(hand)
		if err != nil {
			return nil, err
		}

		handRank := rankHand(ranks, suits)
		
		if handRank == bestHandRank {
			bestHand = append(bestHand, hand)
		} else if less(bestHandRank, handRank) {
			bestHandRank = handRank
			bestHand = bestHand[:0]
			bestHand = append(bestHand, hand)
		}
	}
	return bestHand, nil
}

func less(firstHand, secondHand [6]int) bool {
	for i := 0; i < 6; i++ {
		if firstHand[i] != secondHand[i] {
			return firstHand[i] < secondHand[i]
		}
	}
	return false
}

func rankHand(ranks [5]int, suits string) [6]int {
	cardGroups := groupCards(&ranks)

	if ranks == [5]int{14, 5, 4, 3, 2} {
		ranks = [5]int{5, 4, 3, 2, 1}
	}

	isFlush := isFlush(suits)
	isStraight := isStraight(ranks)

	var handRank [6]int

	if isFlush && isStraight {
		handRank[0] = straightFlush
	} else if cardGroups == "41" {
		handRank[0] = fourOfAKind
	} else if cardGroups == "32" {
		handRank[0] = fullHouse
	} else if isFlush {
		sort.Sort(sort.Reverse(sort.IntSlice(ranks[:])))
		handRank[0] = flush
	} else if isStraight {
		handRank[0] = straight
	} else if cardGroups == "311" {
		handRank[0] = threeOfAKind
	} else if cardGroups == "221" {
		handRank[0] = twoPair
	} else if cardGroups == "2111" {
		handRank[0] = onePair
	} else {
		handRank[0] = highCard
	}

	copy(handRank[1:], ranks[:])
	return handRank
}

func groupCards(ranks *[5]int) string {
	rankGroups := [15]int{}
	for _, r := range ranks {
		rankGroups[r]++
	}

	rankList := make([][2]int, 0, 5)
	for k := 14; k >= 1; k-- {
		if v := rankGroups[k]; v > 0 {
			rankList = append(rankList, [2]int{v, k})
		}
	}

	sort.Slice(rankList, func(i, j int) bool {
		if rankList[i][0] != rankList[j][0] {
			return rankList[i][0] > rankList[j][0]
		}
		return rankList[i][1] > rankList[j][1]
	})

	var groupSize strings.Builder
	groupSize.Grow(5)
	i := 0
	for _, group := range rankList {
		groupSize.WriteByte(byte('0' + group[0]))
		stop := i + group[0]
		for ; i < stop; i++ {
			ranks[i] = group[1]
		}
	}
	return groupSize.String()
}

func isFlush(suits string) bool {
	if len(suits) == 0 {
		return false
	}
	suit := suits[0]
	for i := 1; i < len(suits); i++ {
		if suits[i] != suit {
			return false
		}
	}
	return true
}

func isStraight(ranks [5]int) bool {
	for i := 1; i < 5; i++ {
		if ranks[i-1]-1 != ranks[i] {
			return false
		}
	}
	return true
}

func getCards(hand string) ([5]int, string, error) {
	cards := strings.Fields(hand)
	if len(cards) != 5 {
		return [5]int{}, "", fmt.Errorf("Not a valid hand: %s", hand)
	}

	var ranks [5]int
	suits := make([]byte, 0, 5)

	for i, card := range cards {
		cardLen := len(card)
		if cardLen < 2 || cardLen > 3 {
			return [5]int{}, "", fmt.Errorf("Not a valid card: %s", card)
		}

		var rankStr string
		var suitRune rune

		if cardLen == 2 {
			rankStr = card[:1]
			suitRune = rune(card[1])
		} else {
			rankStr = card[:2]
			suitRune = rune(card[2])
		}

		rank, exists := rankMap[rankStr]
		if !exists || !validSuits[suitRune] {
			return [5]int{}, "", fmt.Errorf("Not a valid card: %s", card)
		}

		ranks[i] = rank
		suits = append(suits, byte(suitRune))
	}

	return ranks, string(suits), nil
}

func getRank(rank string) int {
	if r, exists := rankMap[rank]; exists {
		return r
	}
	return -1
}