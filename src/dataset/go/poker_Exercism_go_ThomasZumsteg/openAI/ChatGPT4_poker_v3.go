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

func BestHand(hands []string) ([]string, error) {
	var bestHand []string
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
			bestHand = []string{hand}
		}
	}
	return bestHand, nil
}

func less(firstHand, secondHand [6]int) bool {
	for i := 0; i < len(firstHand); i++ {
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
	switch {
	case isFlush && isStraight:
		handRank[0] = straightFlush
	case cardGroups == "41":
		handRank[0] = fourOfAKind
	case cardGroups == "32":
		handRank[0] = fullHouse
	case isFlush:
		sort.Sort(sort.Reverse(sort.IntSlice(ranks[:])))
		handRank[0] = flush
	case isStraight:
		handRank[0] = straight
	case cardGroups == "311":
		handRank[0] = threeOfAKind
	case cardGroups == "221":
		handRank[0] = twoPair
	case cardGroups == "2111":
		handRank[0] = onePair
	default:
		handRank[0] = highCard
	}
	copy(handRank[1:], ranks[:])
	return handRank
}

func groupCards(ranks *[5]int) string {
	rankGroups := make(map[int]int, 5)
	for _, r := range ranks {
		rankGroups[r]++
	}

	rankList := make([][2]int, 0, len(rankGroups))
	for k, v := range rankGroups {
		rankList = append(rankList, [2]int{v, k})
	}

	sort.Sort(byGroupAndRank(rankList))

	var groupSize strings.Builder
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

type byGroupAndRank [][2]int

func (by byGroupAndRank) Len() int           { return len(by) }
func (by byGroupAndRank) Swap(i, j int)      { by[i], by[j] = by[j], by[i] }
func (by byGroupAndRank) Less(i, j int) bool { return by[i][0] > by[j][0] || (by[i][0] == by[j][0] && by[i][1] > by[j][1]) }

func isFlush(suits string) bool {
	for i := 1; i < len(suits); i++ {
		if suits[i] != suits[0] {
			return false
		}
	}
	return true
}

func isStraight(ranks [5]int) bool {
	for i := 1; i < len(ranks); i++ {
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
	var suits strings.Builder
	for i, card := range cards {
		rank, suit, err := parseCard(card)
		if err != nil {
			return [5]int{}, "", err
		}
		ranks[i] = rank
		suits.WriteByte(suit)
	}
	return ranks, suits.String(), nil
}

func parseCard(card string) (int, byte, error) {
	n := len(card)
	if n < 2 || n > 3 {
		return -1, 0, fmt.Errorf("Not a valid card: %s", card)
	}

	rank := getRank(card[:n-1])
	suit := card[n-1]
	if rank == -1 || !strings.ContainsRune("♡♢♧♤", rune(suit)) {
		return -1, 0, fmt.Errorf("Not a valid card: %s", card)
	}
	return rank, suit, nil
}

func getRank(rank string) int {
	switch rank {
	case "A":
		return 14
	case "K":
		return 13
	case "Q":
		return 12
	case "J":
		return 11
	case "10":
		return 10
	default:
		if len(rank) == 1 && rank[0] >= '2' && rank[0] <= '9' {
			return int(rank[0] - '0')
		}
		return -1
	}
}