package partyrobot

import (
	"strconv"
	"strings"
)

// Welcome greets a person by name.
func Welcome(name string) string {
	var b strings.Builder
	b.Grow(len(name) + 22)
	b.WriteString("Welcome to my party, ")
	b.WriteString(name)
	b.WriteByte('!')
	return b.String()
}

// HappyBirthday wishes happy birthday to the birthday person and exclaims their age.
func HappyBirthday(name string, age int) string {
	var b strings.Builder
	ageStr := strconv.Itoa(age)
	b.Grow(len(name) + len(ageStr) + 37)
	b.WriteString("Happy birthday ")
	b.WriteString(name)
	b.WriteString("! You are now ")
	b.WriteString(ageStr)
	b.WriteString(" years old!")
	return b.String()
}

// AssignTable assigns a table to each guest.
func AssignTable(name string, table int, neighbor, direction string, distance float64) string {
	var b strings.Builder
	welcomeMsg := Welcome(name)
	tableHex := strconv.FormatInt(int64(table), 16)
	distanceStr := strconv.FormatFloat(distance, 'f', 1, 64)
	
	estimatedSize := len(welcomeMsg) + len(tableHex) + len(direction) + len(distanceStr) + len(neighbor) + 120
	b.Grow(estimatedSize)
	
	b.WriteString(welcomeMsg)
	b.WriteByte('\n')
	b.WriteString("You have been assigned to table ")
	b.WriteString(strings.ToUpper(tableHex))
	b.WriteString(". Your table is ")
	b.WriteString(direction)
	b.WriteString(", exactly ")
	b.WriteString(distanceStr)
	b.WriteString(" meters from here.")
	b.WriteByte('\n')
	b.WriteString("You will be sitting next to ")
	b.WriteString(neighbor)
	b.WriteByte('.')
	
	result := b.String()
	print(result + "\n")
	return result
}