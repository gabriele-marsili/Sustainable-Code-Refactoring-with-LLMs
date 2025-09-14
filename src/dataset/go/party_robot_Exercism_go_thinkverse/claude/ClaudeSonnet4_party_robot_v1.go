package partyrobot

import (
	"strconv"
	"strings"
)

// Welcome greets a person by name.
func Welcome(name string) string {
	var builder strings.Builder
	builder.Grow(len("Welcome to my party, !") + len(name))
	builder.WriteString("Welcome to my party, ")
	builder.WriteString(name)
	builder.WriteString("!")
	return builder.String()
}

// HappyBirthday wishes happy birthday to the birthday person and exclaims their age.
func HappyBirthday(name string, age int) string {
	ageStr := strconv.Itoa(age)
	var builder strings.Builder
	builder.Grow(len("Happy birthday ! You are now  years old!") + len(name) + len(ageStr))
	builder.WriteString("Happy birthday ")
	builder.WriteString(name)
	builder.WriteString("! You are now ")
	builder.WriteString(ageStr)
	builder.WriteString(" years old!")
	return builder.String()
}

// AssignTable assigns a table to each guest.
func AssignTable(name string, table int, neighbor, direction string, distance float64) string {
	var builder strings.Builder
	
	// Pre-allocate capacity to avoid reallocations
	builder.Grow(200)
	
	// Inline welcome message to avoid function call
	builder.WriteString("Welcome to my party, ")
	builder.WriteString(name)
	builder.WriteString("!\n")
	
	builder.WriteString("You have been assigned to table ")
	if table < 10 {
		builder.WriteString("00")
		builder.WriteString(strconv.Itoa(table))
	} else if table < 100 {
		builder.WriteString("0")
		builder.WriteString(strconv.Itoa(table))
	} else {
		builder.WriteString(strconv.Itoa(table))
	}
	builder.WriteString(". ")
	
	builder.WriteString("Your table is ")
	builder.WriteString(direction)
	builder.WriteString(", exactly ")
	builder.WriteString(strconv.FormatFloat(distance, 'f', 1, 64))
	builder.WriteString(" meters from here.\n")
	
	builder.WriteString("You will be sitting next to ")
	builder.WriteString(neighbor)
	builder.WriteString(".")
	
	return builder.String()
}