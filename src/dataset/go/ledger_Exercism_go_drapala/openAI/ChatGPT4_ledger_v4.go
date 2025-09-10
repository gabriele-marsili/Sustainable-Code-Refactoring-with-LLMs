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

	sort.Slice(entries, func(i, j int) bool {
		if entries[i].Date != entries[j].Date {
			return entries[i].Date < entries[j].Date
		}
		if entries[i].Description != entries[j].Description {
			return entries[i].Description < entries[j].Description
		}
		return entries[i].Change < entries[j].Change
	})

	header := ""
	if locale == "nl-NL" {
		header = "Datum       | Omschrijving              | Verandering\n"
	} else {
		header = "Date        | Description               | Change\n"
	}

	var sb strings.Builder
	sb.WriteString(header)

	for _, entry := range entries {
		if len(entry.Date) != 10 || entry.Date[4] != '-' || entry.Date[7] != '-' {
			return "", errors.New("invalid date format")
		}

		date := formatDate(entry.Date, locale)
		description := formatDescription(entry.Description)
		change, err := formatChange(entry.Change, currency, locale)
		if err != nil {
			return "", err
		}

		sb.WriteString(fmt.Sprintf("%-10s | %-25s | %13s\n", date, description, change))
	}

	return sb.String(), nil
}

func formatDate(date, locale string) string {
	year, month, day := date[:4], date[5:7], date[8:]
	if locale == "nl-NL" {
		return fmt.Sprintf("%s-%s-%s", day, month, year)
	}
	return fmt.Sprintf("%s/%s/%s", month, day, year)
}

func formatDescription(description string) string {
	if len(description) > 25 {
		return description[:22] + "..."
	}
	return description + strings.Repeat(" ", 25-len(description))
}

func formatChange(change int, currency, locale string) (string, error) {
	negative := change < 0
	if negative {
		change = -change
	}

	cents := change % 100
	dollars := change / 100

	var formatted string
	if locale == "nl-NL" {
		formatted = fmt.Sprintf("%s %d,%02d", currencySymbol(currency), dollars, cents)
		formatted = strings.ReplaceAll(formatted, ".", ",")
		if negative {
			formatted += "-"
		} else {
			formatted += " "
		}
	} else {
		formatted = fmt.Sprintf("%s%d.%02d", currencySymbol(currency), dollars, cents)
		if negative {
			formatted = "(" + formatted + ")"
		} else {
			formatted += " "
		}
	}

	return formatted, nil
}

func currencySymbol(currency string) string {
	switch currency {
	case "EUR":
		return "€"
	case "USD":
		return "$"
	default:
		return ""
	}
}