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
	if locale != "en-US" && locale != "nl-NL" {
		return "", errors.New("")
	}
	if currency != "EUR" && currency != "USD" {
		return "", errors.New("")
	}

	if len(entries) == 0 {
		if _, err := FormatLedger(currency, "en-US", []Entry{{Date: "2014-01-01", Description: "", Change: 0}}); err != nil {
			return "", err
		}
	}

	entriesCopy := make([]Entry, len(entries))
	copy(entriesCopy, entries)

	sort.Slice(entriesCopy, func(i, j int) bool {
		if entriesCopy[i].Date != entriesCopy[j].Date {
			return entriesCopy[i].Date < entriesCopy[j].Date
		}
		if entriesCopy[i].Description != entriesCopy[j].Description {
			return entriesCopy[i].Description < entriesCopy[j].Description
		}
		return entriesCopy[i].Change < entriesCopy[j].Change
	})

	var header string
	if locale == "nl-NL" {
		header = "Datum      | Omschrijving          | Verandering\n"
	} else {
		header = "Date       | Description           | Change\n"
	}

	var sb strings.Builder
	sb.WriteString(header)

	for _, entry := range entriesCopy {
		if len(entry.Date) != 10 || entry.Date[4] != '-' || entry.Date[7] != '-' {
			return "", errors.New("")
		}

		year, month, day := entry.Date[0:4], entry.Date[5:7], entry.Date[8:10]
		
		var dateStr string
		if locale == "nl-NL" {
			dateStr = day + "-" + month + "-" + year
		} else {
			dateStr = month + "/" + day + "/" + year
		}

		desc := entry.Description
		if len(desc) > 25 {
			desc = desc[:22] + "..."
		}

		amount := formatAmount(entry.Change, currency, locale)
		
		sb.WriteString(fmt.Sprintf("%-10s | %-25s | %13s\n", dateStr, desc, amount))
	}

	return sb.String(), nil
}

func formatAmount(cents int, currency, locale string) string {
	negative := cents < 0
	if negative {
		cents = -cents
	}

	centsStr := strconv.Itoa(cents)
	for len(centsStr) < 3 {
		centsStr = "0" + centsStr
	}

	dollars := centsStr[:len(centsStr)-2]
	centsPart := centsStr[len(centsStr)-2:]

	var dollarsFormatted string
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
			dollarsFormatted = strings.Join(parts, ".")
		} else {
			dollarsFormatted = strings.Join(parts, ",")
		}
	} else {
		dollarsFormatted = dollars
	}

	var symbol string
	if currency == "EUR" {
		symbol = "€"
	} else {
		symbol = "$"
	}

	var result string
	if locale == "nl-NL" {
		result = symbol + " " + dollarsFormatted + "," + centsPart
		if negative {
			result += "-"
		} else {
			result += " "
		}
	} else {
		if negative {
			result = "(" + symbol + dollarsFormatted + "." + centsPart + ")"
		} else {
			result = symbol + dollarsFormatted + "." + centsPart + " "
		}
	}

	return result
}