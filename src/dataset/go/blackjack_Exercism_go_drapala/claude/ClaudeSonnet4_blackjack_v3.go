package blackjack

var cardValues = map[string]int{
	"ace":   11,
	"two":   2,
	"three": 3,
	"four":  4,
	"five":  5,
	"six":   6,
	"seven": 7,
	"eight": 8,
	"nine":  9,
	"ten":   10,
	"jack":  10,
	"queen": 10,
	"king":  10,
	"other": 0,
}

func ParseCard(card string) int {
	return cardValues[card]
}

func IsBlackjack(card1, card2 string) bool {
	return ParseCard(card1)+ParseCard(card2) == 21
}

func LargeHand(isBlackjack bool, dealerScore int) string {
	if isBlackjack {
		if dealerScore == 10 || dealerScore == 11 {
			return "S"
		}
		return "W"
	}
	if dealerScore == 11 {
		return "P"
	}
	return "S"
}

func SmallHand(handScore, dealerScore int) string {
	if handScore >= 17 {
		return "S"
	}
	if handScore <= 11 {
		return "H"
	}
	if handScore >= 12 && handScore <= 16 {
		if dealerScore >= 7 {
			return "H"
		}
		return "S"
	}
	return "S"
}