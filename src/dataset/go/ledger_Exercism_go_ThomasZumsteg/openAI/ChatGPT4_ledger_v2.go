package ledger

import (
	"fmt"
	"sort"
	"strconv"
	"strings"
	"time"
)

// TestVersion is the version of the unit tests that this will pass
const TestVersion = 2

// Entry represents a line in a ledger
type Entry struct {
	Date        string // "Y-m-d"
	Description string
	Change      int // in cents
}

// byDateDescriptionChange defines how to sort entries
type byDateDescriptionChange []Entry

func (d byDateDescriptionChange) Len() int           { return len(d) }
func (d byDateDescriptionChange) Swap(i, j int)      { d[i], d[j] = d[j], d[i] }
func (d byDateDescriptionChange) Less(i, j int) bool { return compareEntries(d[i], d[j]) }

func compareEntries(a, b Entry) bool {
	if a.Date != b.Date {
		return a.Date < b.Date
	}
	if a.Description != b.Description {
		return a.Description < b.Description
	}
	return a.Change < b.Change
}

// FormatLedger prints a ledger of entries given some localization
func FormatLedger(currency, locale string, entries []Entry) (string, error) {
	currencySymbol, err := getCurrencySymbol(currency)
	if err != nil {
		return "", err
	}

	localDateFmt, header, currencyFormatter, err := getLocaleSettings(locale)
	if err != nil {
		return "", err
	}

	sort.Sort(byDateDescriptionChange(entries))

	var sb strings.Builder
	sb.WriteString(header)

	for _, entry := range entries {
		if len(entry.Description) > 25 {
			entry.Description = entry.Description[:22] + "..."
		}

		date, err := time.Parse("2006-01-02", entry.Date)
		if err != nil {
			return "", err
		}

		sb.WriteString(fmt.Sprintf("%10s | %-25s | %13s\n",
			date.Format(localDateFmt), entry.Description,
			currencyFormatter(entry.Change, currencySymbol)))
	}

	return sb.String(), nil
}

func getCurrencySymbol(currency string) (string, error) {
	switch currency {
	case "USD":
		return "$", nil
	case "EUR":
		return "€", nil
	default:
		return "", fmt.Errorf("unknown currency: %s", currency)
	}
}

func getLocaleSettings(locale string) (string, string, func(int, string) string, error) {
	switch locale {
	case "nl-NL":
		return "02-01-2006", fmt.Sprintf("%-10s | %-25s | %s\n", "Datum", "Omschrijving", "Verandering"), formatDutchCurrency, nil
	case "en-US":
		return "01/02/2006", fmt.Sprintf("%-10s | %-25s | %s\n", "Date", "Description", "Change"), formatUSCurrency, nil
	default:
		return "", "", nil, fmt.Errorf("unknown locale: %s", locale)
	}
}

func formatDutchCurrency(cents int, currencySymbol string) string {
	sign := " "
	if cents < 0 {
		sign = "-"
		cents = -cents
	}
	return fmt.Sprintf("%s %s%s", currencySymbol, humanReadable(cents, ".", ","), sign)
}

func formatUSCurrency(cents int, currencySymbol string) string {
	if cents < 0 {
		return fmt.Sprintf("(%s%s)", currencySymbol, humanReadable(-cents, ",", "."))
	}
	return fmt.Sprintf("%s%s ", currencySymbol, humanReadable(cents, ",", "."))
}

func humanReadable(cents int, separator, decimal string) string {
	dollars := strconv.Itoa(cents / 100)
	if len(dollars) > 3 {
		var sb strings.Builder
		for i, r := range reverseString(dollars) {
			if i > 0 && i%3 == 0 {
				sb.WriteRune(rune(separator[0]))
			}
			sb.WriteRune(r)
		}
		dollars = reverseString(sb.String())
	}
	return fmt.Sprintf("%s%s%02d", dollars, decimal, cents%100)
}

func reverseString(s string) string {
	runes := []rune(s)
	for i, j := 0, len(runes)-1; i < j; i, j = i+1, j-1 {
		runes[i], runes[j] = runes[j], runes[i]
	}
	return string(runes)
}