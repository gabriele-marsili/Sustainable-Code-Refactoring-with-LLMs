package partyrobot

import (
	"fmt"
	"strconv"
)

// Welcome greets a person by name.
func Welcome(name string) string {
	return "Welcome to my party, " + name + "!"
}

// HappyBirthday wishes happy birthday to the birthday person and stands out his age.
func HappyBirthday(name string, age int) string {
	return "Happy birthday " + name + "! You are now " + strconv.Itoa(age) + " years old!"
}

// AssignTable assigns a table to each guest.
func AssignTable(name string, table int, neighbour, direction string, distance float64) string {
	welcomeMessage := Welcome(name)
	tableHex := fmt.Sprintf("%X", table)
	distanceStr := fmt.Sprintf("%.1f", distance)

	return welcomeMessage + "\nYou have been assigned to table " + tableHex + ". Your table is " + direction + ", exactly " + distanceStr + " meters from here.\nYou will be sitting next to " + neighbour + "."
}