package blackjack

// ruleset maps a card to its value.
var ruleset = map[string]int{
	"ace": 11, "two": 2, "three": 3, "four": 4, "five": 5, "six": 6, "seven": 7,
	"eight": 8, "nine": 9, "ten": 10, "jack": 10, "queen": 10, "king": 10,
}

// cardValues stores pre-parsed card values to avoid redundant lookups.
var cardValues = map[string]int{}

// ParseCard returns the integer value of a card following blackjack ruleset.
func ParseCard(card string) int {
	if value, ok := cardValues[card]; ok {
		return value
	}

	value, ok := ruleset[card]
	if !ok {
		return 0
	}

	cardValues[card] = value
	return value
}

// FirstTurn returns the decision for the first turn, given two cards of the
// player and one card of the dealer.
func FirstTurn(card1, card2, dealerCard string) string {
	card1Value := ParseCard(card1)
	card2Value := ParseCard(card2)
	dealerCardValue := ParseCard(dealerCard)
	sum := card1Value + card2Value

	switch {
	case sum == 22:
		return "P"
	case sum == 21:
		if dealerCardValue < 10 {
			return "W"
		}
		return "S"
	case sum >= 17:
		return "S"
	case sum < 12:
		return "H"
	case sum < 17:
		if dealerCardValue >= 7 {
			return "H"
		}
		return "S"
	default:
		return "" // Should not happen, but handle it gracefully.
	}
}