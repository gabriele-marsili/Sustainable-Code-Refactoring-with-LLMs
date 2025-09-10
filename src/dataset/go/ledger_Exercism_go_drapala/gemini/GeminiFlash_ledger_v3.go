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
	var dateFormat string
	switch locale {
	case "nl-NL":
		header = "Datum      | Omschrijving              | Verandering"
		dateFormat = "%s-%s-%s"
	case "en-US":
		header = "Date       | Description             | Change"
		dateFormat = "%s/%s/%s"
	default:
		return "", errors.New("invalid locale")
	}

	var sb strings.Builder
	sb.WriteString(header)
	sb.WriteString("\n")

	for _, entry := range entries {
		if len(entry.Date) != 10 || entry.Date[4] != '-' || entry.Date[7] != '-' {
			return "", errors.New("invalid date format")
		}

		description := entry.Description
		if len(description) > 25 {
			description = description[:22] + "..."
		} else {
			description += strings.Repeat(" ", 25-len(description))
		}

		date := fmt.Sprintf(dateFormat, entry.Date[5:7], entry.Date[8:10], entry.Date[0:4])

		amount, err := formatAmount(entry.Change, currency, locale)
		if err != nil {
			return "", err
		}

		sb.WriteString(date)
		sb.WriteString(strings.Repeat(" ", 10-len(date)))
		sb.WriteString(" | ")
		sb.WriteString(description)
		sb.WriteString(" | ")
		sb.WriteString(strings.Repeat(" ", 13-len(amount)))
		sb.WriteString(amount)
		sb.WriteString("\n")
	}

	return sb.String(), nil
}

func formatAmount(change int, currency string, locale string) (string, error) {
	negative := change < 0
	if negative {
		change = -change
	}

	centsStr := strconv.Itoa(change)
	if len(centsStr) == 1 {
		centsStr = "00" + centsStr
	} else if len(centsStr) == 2 {
		centsStr = "0" + centsStr
	}

	integerPart := centsStr[:len(centsStr)-2]
	fractionalPart := centsStr[len(centsStr)-2:]

	var formattedInteger string
	for i := len(integerPart); i > 0; i -= 3 {
		start := i - 3
		if start < 0 {
			start = 0
		}
		if len(formattedInteger) > 0 {
			if locale == "nl-NL" {
				formattedInteger = integerPart[start:i] + "." + formattedInteger
			} else {
				formattedInteger = integerPart[start:i] + "," + formattedInteger
			}

		} else {
			formattedInteger = integerPart[start:i]
		}
	}

	var currencySymbol string
	switch currency {
	case "EUR":
		currencySymbol = "€"
	case "USD":
		currencySymbol = "$"
	default:
		return "", errors.New("invalid currency")
	}

	var amount string
	if locale == "nl-NL" {
		amount = currencySymbol + " " + formattedInteger + "," + fractionalPart
		if negative {
			amount += "-"
		} else {
			amount += " "
		}
	} else if locale == "en-US" {
		if negative {
			amount = "("
		}
		amount += currencySymbol + formattedInteger + "." + fractionalPart
		if negative {
			amount += ")"
		} else {
			amount += " "
		}
	} else {
		return "", errors.New("invalid locale")
	}

	return amount, nil
}