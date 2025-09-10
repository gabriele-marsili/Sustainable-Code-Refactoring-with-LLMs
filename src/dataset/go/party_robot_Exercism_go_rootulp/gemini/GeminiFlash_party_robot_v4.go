package partyrobot

import (
	"fmt"
	"strings"
)

// Welcome greets a person by name.
func Welcome(name string) string {
	var sb strings.Builder
	sb.WriteString("Welcome to my party, ")
	sb.WriteString(name)
	sb.WriteString("!")
	return sb.String()
}

// HappyBirthday wishes happy birthday to the birthday person and stands out his age.
func HappyBirthday(name string, age int) string {
	var sb strings.Builder
	sb.WriteString("Happy birthday ")
	sb.WriteString(name)
	sb.WriteString("! You are now ")
	sb.WriteString(fmt.Sprintf("%d", age))
	sb.WriteString(" years old!")
	return sb.String()
}

// AssignTable assigns a table to each guest.
func AssignTable(name string, table int, neighbour, direction string, distance float64) string {
	var sb strings.Builder
	sb.WriteString(Welcome(name))
	sb.WriteString("\nYou have been assigned to table ")
	sb.WriteString(fmt.Sprintf("%X", table))
	sb.WriteString(". Your table is ")
	sb.WriteString(direction)
	sb.WriteString(", exactly ")
	sb.WriteString(fmt.Sprintf("%.1f", distance))
	sb.WriteString(" meters from here.\nYou will be sitting next to ")
	sb.WriteString(neighbour)
	sb.WriteString(".")
	return sb.String()
}