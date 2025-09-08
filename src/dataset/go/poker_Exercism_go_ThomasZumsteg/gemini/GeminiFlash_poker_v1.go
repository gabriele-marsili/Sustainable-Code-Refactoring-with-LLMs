package poker

import (
	"fmt"
	"sort"
	"strings"
)

// TestVersion the version of the unit test that this will pass
const TestVersion = 1

// ordered rank of poker hands
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

/*BestHand finds the winning poker hand.
Reports an error if any of the hands aren'y properly formatted.
If two hand tie, both hands are returned.*/
func BestHand(hands []string) ([]string, error) {
	bestHand := make([]string, 0, len(hands)) // Pre-allocate for potential ties

	// first int is type of the hand, remainder are ordered card ranks
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

/*less determines if the first poker hand is lower rank than the second.*/
func less(firstHand, secondHand [6]int) bool {
	for i, v := range firstHand {
		if v != secondHand[i] {
			return v < secondHand[i]
		}
	}
	return false
}

/*rankHand scores a poker hand.
First by determining the type of hand,
Then by sorting the card ranks into their order of comparison.*/
func rankHand(ranks [5]int, suits string) [6]int {
	// Create a copy to avoid modifying the original ranks array
	ranksCopy := [5]int{}
	copy(ranksCopy[:], ranks[:])

	cardGroups := groupCards(&ranksCopy)

	// Change ranks if ace is played low
	if ranksCopy == [5]int{14, 5, 4, 3, 2} {
		ranksCopy = [5]int{5, 4, 3, 2, 1}
	}
	isFlush := isFlush(suits)
	isStraight := isStraight(ranksCopy)

	var handRank [6]int
	switch {
	case isFlush && isStraight:
		handRank[0] = straightFlush
	case cardGroups == "41":
		handRank[0] = fourOfAKind
	case cardGroups == "32":
		handRank[0] = fullHouse
	case isFlush:
		sort.Sort(sort.Reverse(sort.IntSlice(ranksCopy[:])))
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
	copy(handRank[1:6], ranksCopy[:])
	return handRank
}

/*groupCards orders ranks to match their importance.
Largest matches come first then order by value.*/
func groupCards(ranks *[5]int) string {
	rankGroups := make(map[int]int)
	for _, r := range ranks {
		rankGroups[r]++
	}

	rankList := make([][2]int, 0, len(rankGroups)) // Pre-allocate
	for k, v := range rankGroups {
		rankList = append(rankList, [2]int{v, k})
	}

	sort.Sort(byGroupAndRank(rankList))

	var groupSize strings.Builder
	groupSize.Grow(5) // Maximum possible length is 5

	i := 0
	for _, group := range rankList {
		groupSize.WriteString(fmt.Sprintf("%1d", group[0]))
		stop := i + group[0]
		for ; i < stop; i++ {
			ranks[i] = group[1]
		}
	}
	return groupSize.String()
}

// byGroupAndRank sorts by group size than rank
type byGroupAndRank [][2]int

func (by byGroupAndRank) Len() int      { return len(by) }
func (by byGroupAndRank) Swap(i, j int) { by[i], by[j] = by[j], by[i] }
func (by byGroupAndRank) Less(i, j int) bool {
	if by[i][0] != by[j][0] {
		return by[i][0] > by[j][0]
	}
	return by[i][1] > by[j][1]
}

/*isFlush determines if all the suits are the same.*/
func isFlush(suits string) bool {
	if len(suits) == 0 {
		return true // Or handle as an error, depending on requirements
	}
	firstSuit := rune(suits[0])
	for _, s := range suits[1:] {
		if s != firstSuit {
			return false
		}
	}
	return true
}

/*isStraight determines if the cards are sequential.*/
func isStraight(ranks [5]int) bool {
	for i := 1; i < len(ranks); i++ {
		if ranks[i-1]-1 != ranks[i] {
			return false
		}
	}
	return true
}

/*getCards validates a hand and splits the cards into suits and ranks.*/
func getCards(hand string) ([5]int, string, error) {
	cards := strings.Fields(hand)
	if len(cards) != 5 {
		return [5]int{}, "", fmt.Errorf("Not a valid hand: %s", hand)
	}
	var ranks [5]int
	suits := make([]byte, 0, 5) // Use byte slice for efficiency

	for i, card := range cards {
		cardLen := len(card)
		var rank int
		var suit byte

		switch cardLen {
		case 2:
			rank = getRank(card[:1])
			suit = card[1]
		case 3:
			rank = getRank(card[:2])
			suit = card[2]
		default:
			return [5]int{}, "", fmt.Errorf("Not a valid card: %s", card)
		}

		if rank == -1 || !strings.Contains("♡♢♧♤", string(suit)) {
			return [5]int{}, "", fmt.Errorf("Not a valid card: %s", card)
		}
		suits = append(suits, suit)
		ranks[i] = rank
	}

	return ranks, string(suits), nil
}

/*getRank converts a cards string rank into an integer rank*/
func getRank(rank string) int {
	switch rank {
	case "A":
		return 14
	case "2":
		return 2
	case "3":
		return 3
	case "4":
		return 4
	case "5":
		return 5
	case "6":
		return 6
	case "7":
		return 7
	case "8":
		return 8
	case "9":
		return 9
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