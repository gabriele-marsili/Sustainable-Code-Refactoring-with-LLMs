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
	if locale != "en-US" && locale != "nl-NL" {
		return "", errors.New("")
	}
	if currency != "EUR" && currency != "USD" {
		return "", errors.New("")
	}

	if len(entries) == 0 {
		var header string
		if locale == "nl-NL" {
			header = "Datum      | Omschrijving              | Verandering\n"
		} else {
			header = "Date       | Description               | Change\n"
		}
		return header, nil
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

	var sb strings.Builder
	if locale == "nl-NL" {
		sb.WriteString("Datum      | Omschrijving              | Verandering\n")
	} else {
		sb.WriteString("Date       | Description               | Change\n")
	}

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
		
		sb.WriteString(dateStr)
		sb.WriteString(strings.Repeat(" ", 10-len(dateStr)))
		sb.WriteString(" | ")
		sb.WriteString(desc)
		sb.WriteString(strings.Repeat(" ", 25-len(desc)))
		sb.WriteString(" | ")
		sb.WriteString(strings.Repeat(" ", 13-len(amount)))
		sb.WriteString(amount)
		sb.WriteString("\n")
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

	var parts []string
	for len(dollars) > 3 {
		parts = append([]string{dollars[len(dollars)-3:]}, parts...)
		dollars = dollars[:len(dollars)-3]
	}
	if len(dollars) > 0 {
		parts = append([]string{dollars}, parts...)
	}

	var symbol string
	if currency == "EUR" {
		symbol = "€"
	} else {
		symbol = "$"
	}

	if locale == "nl-NL" {
		result := symbol + " " + strings.Join(parts, ".") + "," + centsPart
		if negative {
			result += "-"
		} else {
			result += " "
		}
		return result
	} else {
		result := ""
		if negative {
			result += "("
		}
		result += symbol + strings.Join(parts, ",") + "." + centsPart
		if negative {
			result += ")"
		} else {
			result += " "
		}
		return result
	}
}