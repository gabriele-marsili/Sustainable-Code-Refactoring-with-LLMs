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
	groupSize.Grow(len(rankList))
	i := 0
	for _, group := range rankList {
		groupSize.WriteByte('0' + byte(group[0]))
		stop := i + group[0]
		for ; i < stop; i++ {
			ranks[i] = group[1]
		}
	}
	return groupSize.String()
}

type byGroupAndRank [][2]int

func (by byGroupAndRank) Len() int      { return len(by) }
func (by byGroupAndRank) Swap(i, j int) { by[i], by[j] = by[j], by[i] }
func (by byGroupAndRank) Less(i, j int) bool {
	if by[i][0] != by[j][0] {
		return by[i][0] > by[j][0]
	}
	return by[i][1] > by[j][1]
}

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
	suits.Grow(5)

	for i, card := range cards {
		cardRunes := strings.Split(card, "")
		var rank int
		var suit string
		switch len(cardRunes) {
		case 2:
			rank, suit = getRank(cardRunes[0]), cardRunes[1]
		case 3:
			rank, suit = getRank(cardRunes[0]+cardRunes[1]), cardRunes[2]
		default:
			return [5]int{}, "", fmt.Errorf("Not a valid card: %s", card)
		}

		if rank == -1 || !strings.Contains("♡♢♧♤", suit) {
			return [5]int{}, "", fmt.Errorf("Not a valid card: %s", card)
		}
		suits.WriteByte(suit[0])
		ranks[i] = rank
	}
	return ranks, suits.String(), nil
}

func getRank(rank string) int {
	switch rank {
	case "A":
		return 14
	case "2", "3", "4", "5", "6", "7", "8", "9":
		return int(rank[0] - '0')
	case "10":
		return 10
	case "J":
		return 11
	case "Q":
		return 12
	case "K":
		return 13
	default:
		return -1
	}
}