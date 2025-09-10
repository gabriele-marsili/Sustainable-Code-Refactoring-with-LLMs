package partyrobot

import (
	"fmt"
	"strconv"
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

// HappyBirthday wishes happy birthday to the birthday person and exclaims their age.
func HappyBirthday(name string, age int) string {
	var sb strings.Builder
	sb.WriteString("Happy birthday ")
	sb.WriteString(name)
	sb.WriteString("! You are now ")
	sb.WriteString(strconv.Itoa(age))
	sb.WriteString(" years old!")
	return sb.String()
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

	result := sb.String()
	fmt.Println(result)
	return result
}