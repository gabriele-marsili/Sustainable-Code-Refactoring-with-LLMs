package partyrobot

import (
	"fmt"
	"strings"
)

// Welcome greets a person by name.
func Welcome(name string) string {
	return "Welcome to my party, " + name + "!"
}

// HappyBirthday wishes happy birthday to the birthday person and exclaims their age.
func HappyBirthday(name string, age int) string {
	return "Happy birthday " + name + "! You are now " + fmt.Sprint(age) + " years old!"
}

// AssignTable assigns a table to each guest.
func AssignTable(name string, table int, neighbor, direction string, distance float64) string {
	var sb strings.Builder
	sb.WriteString(Welcome(name))
	sb.WriteString("\nYou have been assigned to table ")
	sb.WriteString(fmt.Sprintf("%X", table))
	sb.WriteString(". Your table is ")
	sb.WriteString(direction)
	sb.WriteString(", exactly ")
	sb.WriteString(fmt.Sprintf("%.1f", distance))
	sb.WriteString(" meters from here.\nYou will be sitting next to ")
	sb.WriteString(neighbor)
	sb.WriteString(".")
	return sb.String()
}