package blackjack

// ruleset maps a card to its value.
var ruleset = map[string]int{
	"ace": 11, "two": 2, "three": 3, "four": 4, "five": 5, "six": 6, "seven": 7,
	"eight": 8, "nine": 9, "ten": 10, "jack": 10, "queen": 10, "king": 10,
}

// cardValues stores the integer values of cards for faster access.
var cardValues = [13]int{11, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10}

// cardIndex maps card names to their index in cardValues.
var cardIndex = map[string]int{
	"ace": 0, "two": 1, "three": 2, "four": 3, "five": 4, "six": 5, "seven": 6,
	"eight": 7, "nine": 8, "ten": 9, "jack": 10, "queen": 11, "king": 12,
}

// ParseCard returns the integer value of a card following blackjack ruleset.
func ParseCard(card string) int {
	index, ok := cardIndex[card]
	if !ok {
		return 0
	}
	return cardValues[index]
}

// FirstTurn returns the decision for the first turn, given two cards of the
// player and one card of the dealer.
func FirstTurn(card1, card2, dealerCard string) string {
	sum := ParseCard(card1) + ParseCard(card2)

	switch {
	case sum == 22:
		return "P"
	case sum == 21:
		if ParseCard(dealerCard) < 10 {
			return "W"
		}
		return "S"
	case sum >= 17:
		return "S"
	case sum >= 12 && sum <= 16:
		if ParseCard(dealerCard) >= 7 {
			return "H"
		}
		return "S"
	default:
		return "H"
	}
}