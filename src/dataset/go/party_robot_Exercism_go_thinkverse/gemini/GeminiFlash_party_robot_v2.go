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
	builder.Grow(256) // Pre-allocate memory to avoid reallocations

	builder.WriteString(Welcome(name))
	builder.WriteString("\nYou have been assigned to table ")
	fmt.Fprintf(&builder, "%03d", table)
	builder.WriteString(". Your table is ")
	builder.WriteString(direction)
	builder.WriteString(", exactly ")
	fmt.Fprintf(&builder, "%.1f", distance)
	builder.WriteString(" meters from here.\nYou will be sitting next to ")
	builder.WriteString(neighbor)
	builder.WriteString(".")

	return builder.String()
}