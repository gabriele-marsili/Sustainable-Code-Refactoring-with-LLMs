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
	welcome := "Welcome to my party, " + name + "!"
	tableHex := strconv.FormatInt(int64(table), 16)
	distanceStr := strconv.FormatFloat(distance, 'f', 1, 64)
	
	return welcome + "\nYou have been assigned to table " + tableHex + ". Your table is " + direction + ", exactly " + distanceStr + " meters from here.\nYou will be sitting next to " + neighbour + "."
}