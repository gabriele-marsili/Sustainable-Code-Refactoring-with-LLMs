package poker

import (
	"fmt"
	"sort"
	"strings"
)

//TestVersion the version of the unit test that this will pass
const TestVersion = 1

//ordered rank of poker hands
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

/*BestHand finds the winning poker hand.
Reports an error if any of the hands aren'y properly formatted.
If two hand tie, both hands are returned.*/
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

/*less determines if the first poker hand is lower rank than the second.*/
func less(firstHand, secondHand [6]int) bool {
	for i := 0; i < 6; i++ {
		if firstHand[i] != secondHand[i] {
			return firstHand[i] < secondHand[i]
		}
	}
	return false
}

/*rankHand scores a poker hand.
First by determining the type of hand,
Then by sorting the card ranks into their order of comparison.*/
func rankHand(ranks [5]int, suits string) [6]int {
	cardGroups := groupCards(&ranks)

	// Change ranks if ace is played low
	if ranks[0] == 14 && ranks[1] == 5 && ranks[2] == 4 && ranks[3] == 3 && ranks[4] == 2 {
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

/*groupCards orders ranks to match their importance.
Largest matches come first then order by value.*/
func groupCards(ranks *[5]int) string {
	var rankCounts [15]int
	for _, r := range ranks {
		rankCounts[r]++
	}

	var groups [][2]int
	for rank := 14; rank >= 2; rank-- {
		if count := rankCounts[rank]; count > 0 {
			groups = append(groups, [2]int{count, rank})
		}
	}

	sort.Slice(groups, func(i, j int) bool {
		if groups[i][0] != groups[j][0] {
			return groups[i][0] > groups[j][0]
		}
		return groups[i][1] > groups[j][1]
	})

	var groupSize strings.Builder
	groupSize.Grow(5)
	idx := 0
	for _, group := range groups {
		groupSize.WriteByte(byte('0' + group[0]))
		for i := 0; i < group[0]; i++ {
			ranks[idx] = group[1]
			idx++
		}
	}
	return groupSize.String()
}

/*isFlush determines if all the suits are the same.*/
func isFlush(suits string) bool {
	if len(suits) == 0 {
		return false
	}
	first := suits[0]
	for i := 1; i < len(suits); i++ {
		if suits[i] != first {
			return false
		}
	}
	return true
}

/*isStraight determines if the cards are sequential.*/
func isStraight(ranks [5]int) bool {
	for i := 1; i < 5; i++ {
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
	var suits strings.Builder
	suits.Grow(5)

	for i, card := range cards {
		if len(card) < 2 || len(card) > 3 {
			return [5]int{}, "", fmt.Errorf("Not a valid card: %s", card)
		}
		
		var rankStr string
		var suitRune rune
		
		if len(card) == 2 {
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
		suits.WriteRune(suitRune)
	}
	return ranks, suits.String(), nil
}

/*getRank converts a cards string rank into an integer rank*/
func getRank(rank string) int {
	if r, exists := rankMap[rank]; exists {
		return r
	}
	return -1
}