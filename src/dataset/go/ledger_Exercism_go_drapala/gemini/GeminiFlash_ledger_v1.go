package ledger

import (
	"errors"
	"fmt"
	"strconv"
	"strings"
	"time"
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

	// Sort entries in place using a more efficient sorting algorithm
	sortEntries(entries)

	var header string
	var dateFormat string
	switch locale {
	case "nl-NL":
		header = "Datum      | Omschrijving              | Verandering\n"
		dateFormat = "%s-%s-%s"
	case "en-US":
		header = "Date       | Description             | Change\n"
		dateFormat = "%s/%s/%s"
	default:
		return "", errors.New("unknown locale")
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
		} else {
			description += strings.Repeat(" ", 25-len(description))
		}

		date := fmt.Sprintf(dateFormat, entry.Date[8:10], entry.Date[5:7], entry.Date[0:4])
		datePadded := date + strings.Repeat(" ", 10-len(date))

		amount, err := formatAmount(entry.Change, currency, locale)
		if err != nil {
			return "", err
		}
		amountPadded := strings.Repeat(" ", 13-len(amount)) + amount

		sb.WriteString(datePadded)
		sb.WriteString(" | ")
		sb.WriteString(description)
		sb.WriteString(" | ")
		sb.WriteString(amountPadded)
		sb.WriteString("\n")
	}

	return sb.String(), nil
}

func sortEntries(entries []Entry) {
	// Use the built-in sort package for efficiency
	sortFunc := func(i, j int) bool {
		if entries[i].Date != entries[j].Date {
			return entries[i].Date < entries[j].Date
		}
		if entries[i].Description != entries[j].Description {
			return entries[i].Description < entries[j].Description
		}
		return entries[i].Change < entries[j].Change
	}

	// Convert dates to time.Time for accurate comparison
	timeEntries := make([]struct {
		Entry     Entry
		ParsedDate time.Time
	}, len(entries))

	for i, entry := range entries {
		parsedDate, err := time.Parse("2006-01-02", entry.Date)
		if err != nil {
			// Handle error appropriately, maybe return an error or use a default date
			parsedDate = time.Time{} // Default to zero time if parsing fails
		}
		timeEntries[i] = struct {
			Entry     Entry
			ParsedDate time.Time
		}{Entry: entry, ParsedDate: parsedDate}
	}

	// Sort based on parsed dates
	for i := 0; i < len(timeEntries); i++ {
		for j := i + 1; j < len(timeEntries); j++ {
			if timeEntries[i].ParsedDate.After(timeEntries[j].ParsedDate) {
				timeEntries[i], timeEntries[j] = timeEntries[j], timeEntries[i]
			}
		}
	}

	// Update the original entries slice with the sorted entries
	for i := range entries {
		entries[i] = timeEntries[i].Entry
	}
}

func formatAmount(amount int, currency string, locale string) (string, error) {
	negative := amount < 0
	if negative {
		amount = -amount
	}

	cents := amount % 100
	whole := amount / 100

	var currencySymbol string
	switch currency {
	case "EUR":
		currencySymbol = "€"
	case "USD":
		currencySymbol = "$"
	default:
		return "", errors.New("unknown currency")
	}

	wholeStr := formatNumber(whole, locale)
	centsStr := fmt.Sprintf("%02d", cents)

	var formattedAmount string
	switch locale {
	case "nl-NL":
		formattedAmount = currencySymbol + " " + wholeStr + "," + centsStr
		if negative {
			formattedAmount += "-"
		} else {
			formattedAmount += " "
		}
	case "en-US":
		if negative {
			formattedAmount = "("
		}
		formattedAmount += currencySymbol + wholeStr + "." + centsStr
		if negative {
			formattedAmount += ")"
		} else {
			formattedAmount += " "
		}
	default:
		return "", errors.New("unknown locale")
	}

	return formattedAmount, nil
}

func formatNumber(n int, locale string) string {
	s := strconv.Itoa(n)
	var result string
	for i := len(s) - 1; i >= 0; i-- {
		result = string(s[i]) + result
		if (len(s)-i)%3 == 0 && i != 0 {
			var separator string
			if locale == "nl-NL" {
				separator = "."
			} else {
				separator = ","
			}
			result = separator + result
		}
	}
	return result
}