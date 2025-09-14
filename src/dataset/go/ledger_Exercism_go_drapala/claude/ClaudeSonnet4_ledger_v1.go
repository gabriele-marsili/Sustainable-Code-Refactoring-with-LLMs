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
		if locale != "en-US" && locale != "nl-NL" {
			return "", errors.New("")
		}
		if currency != "EUR" && currency != "USD" {
			return "", errors.New("")
		}
		if locale == "nl-NL" {
			return "Datum      | Omschrijving              | Verandering\n", nil
		}
		return "Date       | Description               | Change\n", nil
	}

	// Validate inputs early
	if locale != "en-US" && locale != "nl-NL" {
		return "", errors.New("")
	}
	if currency != "EUR" && currency != "USD" {
		return "", errors.New("")
	}

	// Validate entries and sort in place
	for _, entry := range entries {
		if len(entry.Date) != 10 || entry.Date[4] != '-' || entry.Date[7] != '-' {
			return "", errors.New("")
		}
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

	// Build header
	var header string
	if locale == "nl-NL" {
		header = "Datum      | Omschrijving              | Verandering\n"
	} else {
		header = "Date       | Description               | Change\n"
	}

	// Pre-allocate string builder
	var result strings.Builder
	result.Grow(len(header) + len(entries)*60) // Estimate capacity
	result.WriteString(header)

	// Process entries sequentially
	for _, entry := range entries {
		line, err := formatEntry(entry, currency, locale)
		if err != nil {
			return "", err
		}
		result.WriteString(line)
	}

	return result.String(), nil
}

func formatEntry(entry Entry, currency, locale string) (string, error) {
	// Format date
	d1, d3, d5 := entry.Date[0:4], entry.Date[5:7], entry.Date[8:10]
	var date string
	if locale == "nl-NL" {
		date = d5 + "-" + d3 + "-" + d1
	} else {
		date = d3 + "/" + d5 + "/" + d1
	}

	// Format description
	desc := entry.Description
	if len(desc) > 25 {
		desc = desc[:22] + "..."
	} else {
		desc = desc + strings.Repeat(" ", 25-len(desc))
	}

	// Format amount
	amount, err := formatAmount(entry.Change, currency, locale)
	if err != nil {
		return "", err
	}

	return date + strings.Repeat(" ", 10-len(date)) + " | " + desc + " | " +
		strings.Repeat(" ", 13-len(amount)) + amount + "\n", nil
}

func formatAmount(cents int, currency, locale string) (string, error) {
	negative := cents < 0
	if negative {
		cents = -cents
	}

	var symbol string
	if currency == "EUR" {
		symbol = "€"
	} else if currency == "USD" {
		symbol = "$"
	} else {
		return "", errors.New("")
	}

	// Format cents to string with leading zeros
	centsStr := strconv.Itoa(cents)
	for len(centsStr) < 3 {
		centsStr = "0" + centsStr
	}

	// Split into dollars and cents
	dollars := centsStr[:len(centsStr)-2]
	centsPart := centsStr[len(centsStr)-2:]

	// Add thousand separators
	var formattedDollars string
	if len(dollars) > 3 {
		var parts []string
		for len(dollars) > 3 {
			parts = append([]string{dollars[len(dollars)-3:]}, parts...)
			dollars = dollars[:len(dollars)-3]
		}
		if len(dollars) > 0 {
			parts = append([]string{dollars}, parts...)
		}
		if locale == "nl-NL" {
			formattedDollars = strings.Join(parts, ".")
		} else {
			formattedDollars = strings.Join(parts, ",")
		}
	} else {
		formattedDollars = dollars
	}

	// Build final amount string
	var amount string
	if locale == "nl-NL" {
		amount = symbol + " " + formattedDollars + "," + centsPart
		if negative {
			amount += "-"
		} else {
			amount += " "
		}
	} else {
		if negative {
			amount = "(" + symbol + formattedDollars + "." + centsPart + ")"
		} else {
			amount = symbol + formattedDollars + "." + centsPart + " "
		}
	}

	return amount, nil
}