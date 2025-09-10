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
		return FormatLedger(currency, "en-US", []Entry{{Date: "2014-01-01", Description: "", Change: 0}})
	}

	if locale != "nl-NL" && locale != "en-US" {
		return "", errors.New("unsupported locale")
	}

	if currency != "EUR" && currency != "USD" {
		return "", errors.New("unsupported currency")
	}

	// Sort entries
	sort.Slice(entries, func(i, j int) bool {
		if entries[i].Date != entries[j].Date {
			return entries[i].Date < entries[j].Date
		}
		if entries[i].Description != entries[j].Description {
			return entries[i].Description < entries[j].Description
		}
		return entries[i].Change < entries[j].Change
	})

	// Header
	var header string
	if locale == "nl-NL" {
		header = "Datum       | Omschrijving              | Verandering\n"
	} else {
		header = "Date        | Description               | Change\n"
	}

	// Format entries
	var sb strings.Builder
	sb.WriteString(header)

	for _, entry := range entries {
		if len(entry.Date) != 10 || entry.Date[4] != '-' || entry.Date[7] != '-' {
			return "", errors.New("invalid date format")
		}

		// Format date
		var formattedDate string
		if locale == "nl-NL" {
			formattedDate = entry.Date[8:10] + "-" + entry.Date[5:7] + "-" + entry.Date[0:4]
		} else {
			formattedDate = entry.Date[5:7] + "/" + entry.Date[8:10] + "/" + entry.Date[0:4]
		}

		// Format description
		description := entry.Description
		if len(description) > 25 {
			description = description[:22] + "..."
		} else {
			description = description + strings.Repeat(" ", 25-len(description))
		}

		// Format change
		cents := entry.Change
		negative := cents < 0
		if negative {
			cents = -cents
		}

		centsStr := strconv.Itoa(cents)
		if len(centsStr) < 3 {
			centsStr = strings.Repeat("0", 3-len(centsStr)) + centsStr
		}
		whole, fraction := centsStr[:len(centsStr)-2], centsStr[len(centsStr)-2:]

		var formattedChange string
		if locale == "nl-NL" {
			formattedChange = formatCurrency(whole, ".", ",", currency, negative, true)
			formattedChange += fraction
			if negative {
				formattedChange += "-"
			} else {
				formattedChange += " "
			}
		} else {
			formattedChange = formatCurrency(whole, ",", ".", currency, negative, false)
			formattedChange += "." + fraction
			if negative {
				formattedChange = "(" + formattedChange + ")"
			} else {
				formattedChange += " "
			}
		}

		// Append formatted entry
		sb.WriteString(fmt.Sprintf("%-10s | %-25s | %13s\n", formattedDate, description, formattedChange))
	}

	return sb.String(), nil
}

func formatCurrency(whole, sep, dec, currency string, negative, spaceAfter bool) string {
	var parts []string
	for len(whole) > 3 {
		parts = append([]string{whole[len(whole)-3:]}, parts...)
		whole = whole[:len(whole)-3]
	}
	if len(whole) > 0 {
		parts = append([]string{whole}, parts...)
	}
	result := strings.Join(parts, sep)
	if currency == "EUR" {
		result = "€ " + result
	} else if currency == "USD" {
		result = "$" + result
	}
	if spaceAfter {
		result += " "
	}
	return result
}