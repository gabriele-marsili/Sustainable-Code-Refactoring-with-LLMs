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
	
	welcomeMsg := Welcome(name)
	tableStr := formatTable(table)
	distanceStr := formatDistance(distance)
	
	totalLen := len(welcomeMsg) + 1 + 
		len("You have been assigned to table . Your table is , exactly  meters from here.\nYou will be sitting next to .") +
		len(tableStr) + len(direction) + len(distanceStr) + len(neighbor)
	
	builder.Grow(totalLen)
	builder.WriteString(welcomeMsg)
	builder.WriteByte('\n')
	builder.WriteString("You have been assigned to table ")
	builder.WriteString(tableStr)
	builder.WriteString(". Your table is ")
	builder.WriteString(direction)
	builder.WriteString(", exactly ")
	builder.WriteString(distanceStr)
	builder.WriteString(" meters from here.\nYou will be sitting next to ")
	builder.WriteString(neighbor)
	builder.WriteString(".")
	
	return builder.String()
}

func formatTable(table int) string {
	if table < 10 {
		return "00" + strconv.Itoa(table)
	}
	if table < 100 {
		return "0" + strconv.Itoa(table)
	}
	return strconv.Itoa(table)
}

func formatDistance(distance float64) string {
	return strconv.FormatFloat(distance, 'f', 1, 64)
}