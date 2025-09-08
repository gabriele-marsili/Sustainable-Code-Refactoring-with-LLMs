package poker

import (
	"errors"
	"sort"
	"strconv"
	"strings"
)

func BestHand(hands []string) ([]string, error) {
	if len(hands) == 0 {
		return nil, errors.New("no hands provided")
	}

	handScores := make([]handScore, 0, len(hands))
	
	for _, hand := range hands {
		score, err := evaluateHand(hand)
		if err != nil {
			return nil, err
		}
		handScores = append(handScores, handScore{hand: hand, score: score})
	}

	sort.Slice(handScores, func(i, j int) bool {
		return compareScores(handScores[i].score, handScores[j].score) > 0
	})

	bestScore := handScores[0].score
	result := make([]string, 0, len(hands))
	
	for _, hs := range handScores {
		if compareScores(hs.score, bestScore) == 0 {
			result = append(result, hs.hand)
		} else {
			break
		}
	}

	return result, nil
}

type handScore struct {
	hand  string
	score [6]int
}

func evaluateHand(hand string) ([6]int, error) {
	cards := strings.Fields(hand)
	if len(cards) != 5 {
		return [6]int{}, errors.New("invalid hand size")
	}

	ranks := make([]int, 5)
	suits := make([]byte, 5)
	
	for i, card := range cards {
		if len(card) < 2 {
			return [6]int{}, errors.New("invalid card format")
		}
		
		rank, err := parseRank(card[:len(card)-1])
		if err != nil {
			return [6]int{}, err
		}
		ranks[i] = rank
		suits[i] = card[len(card)-1]
	}

	sort.Ints(ranks)
	
	rankCounts := [15]int{}
	for _, rank := range ranks {
		rankCounts[rank]++
	}

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
	
	if !isStraight && ranks[0] == 2 && ranks[1] == 3 && ranks[2] == 4 && ranks[3] == 5 && ranks[4] == 14 {
		isStraight = true
		ranks[4] = 1
		sort.Ints(ranks)
	}

	pairs := 0
	threeKind := 0
	fourKind := 0
	
	for rank := 14; rank >= 2; rank-- {
		count := rankCounts[rank]
		if count == 4 {
			fourKind = rank
		} else if count == 3 {
			threeKind = rank
		} else if count == 2 {
			pairs++
		}
	}

	var score [6]int
	
	if isStraight && isFlush {
		score[0] = 8
		score[1] = ranks[4]
	} else if fourKind > 0 {
		score[0] = 7
		score[1] = fourKind
		for rank := 14; rank >= 2; rank-- {
			if rankCounts[rank] == 1 {
				score[2] = rank
				break
			}
		}
	} else if threeKind > 0 && pairs > 0 {
		score[0] = 6
		score[1] = threeKind
		for rank := 14; rank >= 2; rank-- {
			if rankCounts[rank] == 2 {
				score[2] = rank
				break
			}
		}
	} else if isFlush {
		score[0] = 5
		for i := 0; i < 5; i++ {
			score[i+1] = ranks[4-i]
		}
	} else if isStraight {
		score[0] = 4
		score[1] = ranks[4]
	} else if threeKind > 0 {
		score[0] = 3
		score[1] = threeKind
		j := 2
		for rank := 14; rank >= 2; rank-- {
			if rankCounts[rank] == 1 {
				score[j] = rank
				j++
			}
		}
	} else if pairs == 2 {
		score[0] = 2
		j := 1
		for rank := 14; rank >= 2; rank-- {
			if rankCounts[rank] == 2 {
				score[j] = rank
				j++
			}
		}
		for rank := 14; rank >= 2; rank-- {
			if rankCounts[rank] == 1 {
				score[3] = rank
				break
			}
		}
	} else if pairs == 1 {
		score[0] = 1
		for rank := 14; rank >= 2; rank-- {
			if rankCounts[rank] == 2 {
				score[1] = rank
				break
			}
		}
		j := 2
		for rank := 14; rank >= 2; rank-- {
			if rankCounts[rank] == 1 {
				score[j] = rank
				j++
			}
		}
	} else {
		score[0] = 0
		for i := 0; i < 5; i++ {
			score[i+1] = ranks[4-i]
		}
	}

	return score, nil
}

func parseRank(rankStr string) (int, error) {
	switch rankStr {
	case "A":
		return 14, nil
	case "K":
		return 13, nil
	case "Q":
		return 12, nil
	case "J":
		return 11, nil
	default:
		rank, err := strconv.Atoi(rankStr)
		if err != nil || rank < 2 || rank > 10 {
			return 0, errors.New("invalid rank")
		}
		return rank, nil
	}
}

func compareScores(a, b [6]int) int {
	for i := 0; i < 6; i++ {
		if a[i] > b[i] {
			return 1
		} else if a[i] < b[i] {
			return -1
		}
	}
	return 0
}