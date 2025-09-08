package poker

import (
	"errors"
	"sort"
	"strings"
)

type HandType int

const (
	Nothing HandType = iota
	Pair
	TwoPairs
	ThreeOfKind
	Straight
	Flush
	FullHouse
	FourOfKind
	StraightFlush
)

type Card struct {
	Rank int
	Suit rune
}

type Hand struct {
	Cards   []Card
	handType HandType
	score    int
	rawHand  string
}

type ByScore []Hand

func (a ByScore) Len() int           { return len(a) }
func (a ByScore) Swap(i, j int)      { a[i], a[j] = a[j], a[i] }
func (a ByScore) Less(i, j int) bool { return a[i].score < a[j].score }

func parseHands(rawHands []string) ([]Hand, error) {
	hands := make([]Hand, len(rawHands))
	for i, rawHand := range rawHands {
		cards := strings.Split(rawHand, " ")
		if len(cards) != 5 {
			return nil, errors.New("invalid hand: " + rawHand)
		}

		hand, err := parseHand(rawHand)
		if err != nil {
			return nil, err
		}
		hands[i] = hand
	}
	return hands, nil
}

func parseHand(rawHand string) (Hand, error) {
	cards := strings.Split(rawHand, " ")
	if len(cards) != 5 {
		return Hand{}, errors.New("invalid hand: " + rawHand)
	}

	parsedCards := make([]Card, 5)
	ranks := make([]int, 5)
	suits := make([]rune, 5)

	for i, cardStr := range cards {
		rankRune := rune(cardStr[0])
		suitRune := rune(cardStr[1])

		rank := 0
		switch rankRune {
		case '2':
			rank = 2
		case '3':
			rank = 3
		case '4':
			rank = 4
		case '5':
			rank = 5
		case '6':
			rank = 6
		case '7':
			rank = 7
		case '8':
			rank = 8
		case '9':
			rank = 9
		case 'T':
			rank = 10
		case 'J':
			rank = 11
		case 'Q':
			rank = 12
		case 'K':
			rank = 13
		case 'A':
			rank = 14
		default:
			return Hand{}, errors.New("invalid rank: " + string(rankRune))
		}

		if suitRune != 'C' && suitRune != 'D' && suitRune != 'H' && suitRune != 'S' {
			return Hand{}, errors.New("invalid suit: " + string(suitRune))
		}

		parsedCards[i] = Card{Rank: rank, Suit: suitRune}
		ranks[i] = rank
		suits[i] = suitRune
	}

	sort.Ints(ranks)

	handType, score := evaluateHand(ranks, suits)

	return Hand{
		Cards:   parsedCards,
		handType: handType,
		score:    score,
		rawHand:  rawHand,
	}, nil
}

func evaluateHand(ranks []int, suits []rune) (HandType, int) {
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

	if ranks[4] == 14 && ranks[0] == 2 && ranks[1] == 3 && ranks[2] == 4 && ranks[3] == 5 {
		isStraight = true
		ranks[4] = 1
		sort.Ints(ranks)
	}

	if isStraight && isFlush {
		return StraightFlush, 8000 + ranks[4]
	}

	counts := make(map[int]int)
	for _, rank := range ranks {
		counts[rank]++
	}

	var fourKindRank int
	var threeKindRank int
	var pairRanks []int

	for rank, count := range counts {
		if count == 4 {
			fourKindRank = rank
		} else if count == 3 {
			threeKindRank = rank
		} else if count == 2 {
			pairRanks = append(pairRanks, rank)
		}
	}

	if fourKindRank > 0 {
		return FourOfKind, 7000 + fourKindRank
	}

	if threeKindRank > 0 && len(pairRanks) == 1 {
		return FullHouse, 6000 + threeKindRank*100 + pairRanks[0]
	}

	if isFlush {
		return Flush, 5000 + ranks[4]
	}

	if isStraight {
		return Straight, 4000 + ranks[4]
	}

	if threeKindRank > 0 {
		return ThreeOfKind, 3000 + threeKindRank
	}

	if len(pairRanks) == 2 {
		sort.Sort(sort.Reverse(sort.IntSlice(pairRanks)))
		return TwoPairs, 2000 + pairRanks[0]*100 + pairRanks[1]
	}

	if len(pairRanks) == 1 {
		return Pair, 1000 + pairRanks[0]
	}

	return Nothing, ranks[4]
}

func (h Hand) compare(other Hand) (int, error) {
	if h.score > other.score {
		return 1, nil
	} else if h.score < other.score {
		return -1, nil
	}
	return 0, nil
}

func BestHand(rawHands []string) (bestHands []string, err error) {
	hands, err := parseHands(rawHands)
	if err != nil {
		return nil, err
	}

	if len(hands) == 0 {
		return []string{}, nil
	}

	sort.Sort(ByScore(hands))
	bestScore := hands[len(hands)-1].score

	for _, hand := range hands {
		if hand.score == bestScore {
			bestHands = append(bestHands, hand.rawHand)
		}
	}

	return bestHands, nil
}

func getBestHand(rawHands []string) (bestHand Hand, err error) {
	hands, err := parseHands(rawHands)
	if err != nil {
		return Hand{}, err
	}

	if len(hands) == 0 {
		return Hand{}, errors.New("no hands to evaluate")
	}

	sort.Sort(ByScore(hands))
	bestHand = hands[len(hands)-1]
	return bestHand, nil
}