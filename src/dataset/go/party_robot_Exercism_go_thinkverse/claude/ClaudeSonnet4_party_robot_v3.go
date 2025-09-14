package partyrobot

import (
	"fmt"
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
	var builder strings.Builder
	
	builder.Grow(len(name) + len(neighbor) + len(direction) + 120)
	
	builder.WriteString("Welcome to my party, ")
	builder.WriteString(name)
	builder.WriteString("!\nYou have been assigned to table ")
	builder.WriteString(fmt.Sprintf("%03d", table))
	builder.WriteString(". Your table is ")
	builder.WriteString(direction)
	builder.WriteString(", exactly ")
	builder.WriteString(fmt.Sprintf("%.1f", distance))
	builder.WriteString(" meters from here.\nYou will be sitting next to ")
	builder.WriteString(neighbor)
	builder.WriteString(".")
	
	return builder.String()
}