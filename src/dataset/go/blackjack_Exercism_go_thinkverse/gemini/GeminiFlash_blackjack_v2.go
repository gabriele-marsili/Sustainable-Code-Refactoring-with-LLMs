package blackjack

// ruleset maps a card to its value.
var ruleset = map[string]int{
	"ace": 11, "two": 2, "three": 3, "four": 4, "five": 5, "six": 6, "seven": 7,
	"eight": 8, "nine": 9, "ten": 10, "jack": 10, "queen": 10, "king": 10,
}

// cardValues stores pre-calculated card values to avoid redundant lookups.
var cardValues = map[string]int{}

func init() {
	for card, value := range ruleset {
		cardValues[card] = value
	}
}

// ParseCard returns the integer value of a card following blackjack ruleset.
func ParseCard(card string) int {
	return cardValues[card]
}

// FirstTurn returns the decision for the first turn, given two cards of the
// player and one card of the dealer.
func FirstTurn(card1, card2, dealerCard string) string {
	sum := cardValues[card1] + cardValues[card2]

	switch {
	case sum == 22:
		return "P"
	case sum == 21:
		if cardValues[dealerCard] < 10 {
			return "W"
		}
		return "S"
	case sum >= 17:
		return "S"
	case sum < 12:
		return "H"
	case cardValues[dealerCard] >= 7:
		return "H"
	default:
		return "S"
	}
}