package ledger

import (
	"fmt"
	"sort"
	"strconv"
	"strings"
	"time"
)

const TestVersion = 2

type Entry struct {
	Date        string
	Description string
	Change      int
}

type byDateDescriptionChange []Entry

func (d byDateDescriptionChange) Len() int      { return len(d) }
func (d byDateDescriptionChange) Swap(i, j int) { d[i], d[j] = d[j], d[i] }
func (d byDateDescriptionChange) Less(i, j int) bool {
	if d[i].Date != d[j].Date {
		return d[i].Date < d[j].Date
	}
	if d[i].Description != d[j].Description {
		return d[i].Description < d[j].Description
	}
	return d[i].Change < d[j].Change
}

func FormatLedger(currency string, locale string, entries []Entry) (string, error) {
	var currencySymbol string
	switch currency {
	case "USD":
		currencySymbol = "$"
	case "EUR":
		currencySymbol = "€"
	default:
		return "", fmt.Errorf("unknown currency: %s", currency)
	}

	var localDateFmt string
	var header string
	var currencyFormatter func(int, string) string

	switch locale {
	case "nl-NL":
		localDateFmt = "01-02-2006"
		header = "Datum      | Omschrijving              | Verandering\n"
		currencyFormatter = formatDutchCurrency
	case "en-US":
		localDateFmt = "01/02/2006"
		header = "Date       | Description               | Change\n"
		currencyFormatter = formatUSCurrency
	default:
		return "", fmt.Errorf("unknown locale: %s", locale)
	}

	entriesCopy := make([]Entry, len(entries))
	copy(entriesCopy, entries)
	sort.Sort(byDateDescriptionChange(entriesCopy))

	var sb strings.Builder
	sb.WriteString(header)

	dateFmt := "2006-01-02"
	for _, entry := range entriesCopy {
		description := entry.Description
		if len(description) > 25 {
			description = description[:22] + "..."
		}

		t, err := time.Parse(dateFmt, entry.Date)
		if err != nil {
			return "", err
		}
		dateStr := t.Format(localDateFmt)

		sb.WriteString(fmt.Sprintf("%-11s| %-26s| %13s\n",
			dateStr, description, currencyFormatter(entry.Change, currencySymbol)))
	}

	return sb.String(), nil
}

func formatDutchCurrency(cents int, currencySymbol string) string {
	if cents < 0 {
		return fmt.Sprintf("%s %s-", currencySymbol, humanReadable(-cents, ".", ","))
	}
	return fmt.Sprintf("%s %s ", currencySymbol, humanReadable(cents, ".", ","))
}

func formatUSCurrency(cents int, currencySymbol string) string {
	if cents < 0 {
		return fmt.Sprintf("(%s%s)", currencySymbol, humanReadable(-cents, ",", "."))
	}
	return fmt.Sprintf("%s%s ", currencySymbol, humanReadable(cents, ",", "."))
}

func humanReadable(cents int, separator, decimal string) string {
	dollars := cents / 100
	cents %= 100

	dollarsStr := strconv.Itoa(dollars)
	lenDollars := len(dollarsStr)
	var sb strings.Builder
	for i := 0; i < lenDollars; i++ {
		sb.WriteByte(dollarsStr[i])
		if (lenDollars-i-1)%3 == 0 && i != lenDollars-1 {
			sb.WriteString(separator)
		}
	}

	return fmt.Sprintf("%s%s%02d", sb.String(), decimal, cents)
}