package blackjack

import "log"

// cardValues maps card names to their blackjack values.
var cardValues = map[string]int{
	"one": 1, "two": 2, "three": 3, "four": 4, "five": 5,
	"six": 6, "seven": 7, "eight": 8, "nine": 9,
	"ten": 10, "jack": 10, "queen": 10, "king": 10, "ace": 11,
}

// ParseCard returns the integer value of a card following blackjack ruleset.
func ParseCard(card string) int {
	if value, exists := cardValues[card]; exists {
		return value
	}
	log.Printf("card %s is not a valid card", card)
	return 0
}

// IsBlackjack returns true if the player has a blackjack, false otherwise.
func IsBlackjack(card1, card2 string) bool {
	return ParseCard(card1)+ParseCard(card2) == 21
}

// LargeHand implements the decision tree for hand scores larger than 20 points.
func LargeHand(isBlackjack bool, dealerScore int) string {
	if isBlackjack {
		if dealerScore < 10 {
			return "W"
		}
		return "S"
	}
	return "P"
}

// SmallHand implements the decision tree for hand scores with less than 21 points.
func SmallHand(handScore, dealerScore int) string {
	if handScore <= 11 || (handScore >= 12 && handScore <= 16 && dealerScore >= 7) {
		return "H"
	}
	return "S"
}

// FirstTurn returns the semi-optimal decision for the first turn, given the cards of the player and the dealer.
// This function is already implemented and does not need to be edited. It pulls the other functions together in a
// complete decision tree for the first turn.
func FirstTurn(card1, card2, dealerCard string) string {
	handScore := ParseCard(card1) + ParseCard(card2)
	dealerScore := ParseCard(dealerCard)

	if handScore > 20 {
		return LargeHand(IsBlackjack(card1, card2), dealerScore)
	}
	return SmallHand(handScore, dealerScore)
}