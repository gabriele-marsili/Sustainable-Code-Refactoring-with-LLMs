package partyrobot

import "strconv"

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
	return Welcome(name) + "\nYou have been assigned to table " + strconv.FormatInt(int64(table), 16) + ". Your table is " + direction + ", exactly " + strconv.FormatFloat(distance, 'f', 1, 64) + " meters from here.\nYou will be sitting next to " + neighbour + "."
}