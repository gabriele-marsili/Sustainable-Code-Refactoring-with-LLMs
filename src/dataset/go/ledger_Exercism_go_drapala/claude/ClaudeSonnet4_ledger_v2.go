package ledger

import (
	"errors"
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
		if locale == "nl-NL" {
			return "Datum      | Omschrijving              | Verandering\n", nil
		} else if locale == "en-US" {
			return "Date       | Description               | Change\n", nil
		} else {
			return "", errors.New("")
		}
	}

	// Validate inputs early
	if locale != "nl-NL" && locale != "en-US" {
		return "", errors.New("")
	}
	if currency != "EUR" && currency != "USD" {
		return "", errors.New("")
	}

	// Sort entries in place
	sort.Slice(entries, func(i, j int) bool {
		if entries[i].Date != entries[j].Date {
			return entries[i].Date < entries[j].Date
		}
		if entries[i].Description != entries[j].Description {
			return entries[i].Description < entries[j].Description
		}
		return entries[i].Change < entries[j].Change
	})

	// Pre-allocate string builder
	var sb strings.Builder
	sb.Grow(len(entries)*60 + 50) // Estimate capacity

	// Write header
	if locale == "nl-NL" {
		sb.WriteString("Datum      | Omschrijving              | Verandering\n")
	} else {
		sb.WriteString("Date       | Description               | Change\n")
	}

	// Process entries sequentially
	for _, entry := range entries {
		// Validate date format
		if len(entry.Date) != 10 || entry.Date[4] != '-' || entry.Date[7] != '-' {
			return "", errors.New("")
		}

		// Format date
		year, month, day := entry.Date[0:4], entry.Date[5:7], entry.Date[8:10]
		var dateStr string
		if locale == "nl-NL" {
			dateStr = day + "-" + month + "-" + year
		} else {
			dateStr = month + "/" + day + "/" + year
		}

		// Format description
		desc := entry.Description
		if len(desc) > 25 {
			desc = desc[:22] + "..."
		}

		// Format amount
		cents := entry.Change
		negative := cents < 0
		if negative {
			cents = -cents
		}

		centsStr := strconv.Itoa(cents)
		if len(centsStr) == 1 {
			centsStr = "00" + centsStr
		} else if len(centsStr) == 2 {
			centsStr = "0" + centsStr
		}

		dollars := centsStr[:len(centsStr)-2]
		centsPart := centsStr[len(centsStr)-2:]

		// Add thousand separators
		var formattedDollars strings.Builder
		for i, digit := range dollars {
			if i > 0 && (len(dollars)-i)%3 == 0 {
				if locale == "nl-NL" {
					formattedDollars.WriteByte('.')
				} else {
					formattedDollars.WriteByte(',')
				}
			}
			formattedDollars.WriteByte(byte(digit))
		}

		var amountStr string
		if locale == "nl-NL" {
			symbol := "€"
			if currency == "USD" {
				symbol = "$"
			}
			amountStr = symbol + " " + formattedDollars.String() + "," + centsPart
			if negative {
				amountStr += "-"
			} else {
				amountStr += " "
			}
		} else {
			symbol := "$"
			if currency == "EUR" {
				symbol = "€"
			}
			if negative {
				amountStr = "(" + symbol + formattedDollars.String() + "." + centsPart + ")"
			} else {
				amountStr = symbol + formattedDollars.String() + "." + centsPart + " "
			}
		}

		// Write formatted line
		sb.WriteString(dateStr)
		sb.WriteString(strings.Repeat(" ", 10-len(dateStr)))
		sb.WriteString(" | ")
		sb.WriteString(desc)
		sb.WriteString(strings.Repeat(" ", 25-len(desc)))
		sb.WriteString(" | ")
		sb.WriteString(strings.Repeat(" ", 13-len(amountStr)))
		sb.WriteString(amountStr)
		sb.WriteByte('\n')
	}

	return sb.String(), nil
}