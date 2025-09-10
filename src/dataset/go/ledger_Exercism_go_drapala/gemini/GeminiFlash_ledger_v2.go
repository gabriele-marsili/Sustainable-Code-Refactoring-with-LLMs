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

	// Sort entries in place to avoid extra memory allocation
	sortEntries(entries)

	var header string
	var dateFormat string
	switch locale {
	case "nl-NL":
		header = "Datum      | Omschrijving              | Verandering\n"
		dateFormat = "02-01-2006" //dd-mm-yyyy
	case "en-US":
		header = "Date       | Description             | Change\n"
		dateFormat = "01/02/2006" //mm/dd/yyyy
	default:
		return "", errors.New("invalid locale")
	}

	var sb strings.Builder
	sb.WriteString(header)

	for _, entry := range entries {
		date, err := time.Parse("2006-01-02", entry.Date)
		if err != nil {
			return "", errors.New("invalid date format")
		}
		formattedDate := date.Format(dateFormat)

		description := entry.Description
		if len(description) > 25 {
			description = description[:22] + "..."
		} else {
			description += strings.Repeat(" ", 25-len(description))
		}

		amount := formatAmount(entry.Change, currency, locale)

		sb.WriteString(formattedDate)
		sb.WriteString(strings.Repeat(" ", 10-len(formattedDate)))
		sb.WriteString(" | ")
		sb.WriteString(description)
		sb.WriteString(" | ")
		sb.WriteString(strings.Repeat(" ", 13-len(amount)))
		sb.WriteString(amount)
		sb.WriteString("\n")
	}

	return sb.String(), nil
}

func sortEntries(entries []Entry) {
	for i := 0; i < len(entries); i++ {
		for j := i + 1; j < len(entries); j++ {
			if compareEntries(entries[i], entries[j]) > 0 {
				entries[i], entries[j] = entries[j], entries[i]
			}
		}
	}
}

func compareEntries(e1, e2 Entry) int {
	if e1.Date != e2.Date {
		if e1.Date < e2.Date {
			return -1
		}
		return 1
	}
	if e1.Description != e2.Description {
		if e1.Description < e2.Description {
			return -1
		}
		return 1
	}
	if e1.Change != e2.Change {
		if e1.Change < e2.Change {
			return -1
		}
		return 1
	}
	return 0
}

func formatAmount(amount int, currency string, locale string) string {
	negative := amount < 0
	if negative {
		amount = -amount
	}

	cents := amount % 100
	whole := amount / 100

	var formattedAmount string
	switch locale {
	case "nl-NL":
		formattedAmount = formatAmountNL(whole, cents, currency, negative)
	case "en-US":
		formattedAmount = formatAmountUS(whole, cents, currency, negative)
	default:
		return "" // Should not happen, already validated in FormatLedger
	}

	return formattedAmount
}

func formatAmountNL(whole int, cents int, currency string, negative bool) string {
	currencySymbol := getCurrencySymbol(currency)

	wholeStr := formatNumber(whole, ".")
	centsStr := fmt.Sprintf("%02d", cents)

	amountStr := currencySymbol + " " + wholeStr + "," + centsStr
	if negative {
		amountStr += "-"
	} else {
		amountStr += " "
	}

	return amountStr
}

func formatAmountUS(whole int, cents int, currency string, negative bool) string {
	currencySymbol := getCurrencySymbol(currency)

	wholeStr := formatNumber(whole, ",")
	centsStr := fmt.Sprintf("%02d", cents)

	amountStr := currencySymbol + wholeStr + "." + centsStr
	if negative {
		amountStr = "(" + amountStr + ")"
	} else {
		amountStr += " "
	}

	return amountStr
}

func getCurrencySymbol(currency string) string {
	switch currency {
	case "EUR":
		return "€"
	case "USD":
		return "$"
	default:
		return "" // Should not happen, validation should be done before
	}
}

func formatNumber(number int, separator string) string {
	s := strconv.Itoa(number)
	n := len(s)
	var sb strings.Builder
	for i := 0; i < n; i++ {
		if i > 0 && (n-i)%3 == 0 {
			sb.WriteString(separator)
		}
		sb.WriteByte(s[i])
	}
	return sb.String()
}