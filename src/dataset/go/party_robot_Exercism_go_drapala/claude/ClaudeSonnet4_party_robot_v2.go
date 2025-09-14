package partyrobot

import (
	"strconv"
	"strings"
)

// Welcome greets a person by name.
func Welcome(name string) string {
	return "Welcome to my party, " + name + "!"
}

// HappyBirthday wishes happy birthday to the birthday person and exclaims their age.
func HappyBirthday(name string, age int) string {
	return "Happy birthday " + name + "! You are now " + strconv.Itoa(age) + " years old!"
}

// AssignTable assigns a table to each guest.
func AssignTable(name string, table int, neighbor, direction string, distance float64) string {
	var sb strings.Builder
	sb.Grow(150) // Pre-allocate approximate capacity
	
	sb.WriteString("Welcome to my party, ")
	sb.WriteString(name)
	sb.WriteString("!\nYou have been assigned to table ")
	sb.WriteString(strings.ToUpper(strconv.FormatInt(int64(table), 16)))
	sb.WriteString(". Your table is ")
	sb.WriteString(direction)
	sb.WriteString(", exactly ")
	sb.WriteString(strconv.FormatFloat(distance, 'f', 1, 64))
	sb.WriteString(" meters from here.\nYou will be sitting next to ")
	sb.WriteString(neighbor)
	sb.WriteString(".")
	
	s := sb.String()
	println(s)
	return s
}