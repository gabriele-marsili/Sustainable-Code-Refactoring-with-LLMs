package ledger

import (
	"errors"
	"fmt"
	"sort"
	"strconv"
	"strings"
)

type Entry struct {
	Date        string // "Y-m-d"
	Description string
	Change      int // in cents
}

func FormatLedger(currency string, locale string, entries []Entry) (string, error) {
	if len(entries) == 0 {
		return "", nil
	}

	if locale != "nl-NL" && locale != "en-US" {
		return "", errors.New("invalid locale")
	}

	if currency != "EUR" && currency != "USD" {
		return "", errors.New("invalid currency")
	}

	sort.Slice(entries, func(i, j int) bool {
		if entries[i].Date != entries[j].Date {
			return entries[i].Date < entries[j].Date
		}
		if entries[i].Description != entries[j].Description {
			return entries[i].Description < entries[j].Description
		}
		return entries[i].Change < entries[j].Change
	})

	var header string
	if locale == "nl-NL" {
		header = "Datum      | Omschrijving              | Verandering\n"
	} else {
		header = "Date       | Description             | Change\n"
	}

	var sb strings.Builder
	sb.WriteString(header)

	for _, entry := range entries {
		if len(entry.Date) != 10 || entry.Date[4] != '-' || entry.Date[7] != '-' {
			return "", errors.New("invalid date format")
		}

		description := entry.Description
		if len(description) > 25 {
			description = description[:22] + "..."
		}
		description += strings.Repeat(" ", 25-len(description))

		var date string
		if locale == "nl-NL" {
			date = entry.Date[8:10] + "-" + entry.Date[5:7] + "-" + entry.Date[0:4]
		} else {
			date = entry.Date[5:7] + "/" + entry.Date[8:10] + "/" + entry.Date[0:4]
		}
		date += strings.Repeat(" ", 10-len(date))

		changeStr := formatChange(entry.Change, currency, locale)
		sb.WriteString(date)
		sb.WriteString(" | ")
		sb.WriteString(description)
		sb.WriteString(" | ")
		sb.WriteString(strings.Repeat(" ", 13-len(changeStr)))
		sb.WriteString(changeStr)
		sb.WriteString("\n")
	}

	return sb.String(), nil
}

func formatChange(change int, currency string, locale string) string {
	negative := change < 0
	if negative {
		change = -change
	}

	centsStr := strconv.Itoa(change)
	if len(centsStr) < 3 {
		centsStr = strings.Repeat("0", 3-len(centsStr)) + centsStr
	}

	integerPart := centsStr[:len(centsStr)-2]
	decimalPart := centsStr[len(centsStr)-2:]

	var formattedInteger string
	for i := len(integerPart); i > 0; i -= 3 {
		start := i - 3
		if start < 0 {
			start = 0
		}
		if formattedInteger != "" {
			if locale == "nl-NL" {
				formattedInteger = integerPart[start:i] + "." + formattedInteger
			} else {
				formattedInteger = integerPart[start:i] + "," + formattedInteger
			}

		} else {
			formattedInteger = integerPart[start:i]
		}
	}

	var result string
	if locale == "nl-NL" {
		if currency == "EUR" {
			result += "€ "
		} else {
			result += "$ "
		}
		result += formattedInteger + "," + decimalPart
		if negative {
			result += "-"
		} else {
			result += " "
		}
	} else {
		if negative {
			result += "("
		}
		if currency == "EUR" {
			result += "€"
		} else {
			result += "$"
		}
		result += formattedInteger + "." + decimalPart
		if negative {
			result += ")"
		} else {
			result += " "
		}
	}

	return result
}