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
		return "", fmt.Errorf("Unknown currency: %s", currency)
	}

	var localDateFmt, header string
	var currencyFormatter func(int, string) string
	switch locale {
	case "nl-NL":
		localDateFmt = "01-02-2006"
		header = "Datum      | Omschrijving              | Verandering\n"
		currencyFormatter = formatDutchCurrency
	case "en-US":
		localDateFmt = "02/01/2006"
		header = "Date       | Description               | Change\n"
		currencyFormatter = formatUSCurrency
	default:
		return "", fmt.Errorf("Unknown locale: %s", locale)
	}

	if len(entries) == 0 {
		return header, nil
	}

	entriesCopy := make([]Entry, len(entries))
	copy(entriesCopy, entries)
	sort.Sort(byDateDescriptionChange(entriesCopy))

	var result strings.Builder
	result.WriteString(header)
	
	dateFmt := "2006-02-01"
	
	for _, entry := range entriesCopy {
		desc := entry.Description
		if len(desc) > 25 {
			desc = desc[:22] + "..."
		}

		date, err := time.Parse(dateFmt, entry.Date)
		if err != nil {
			return "", err
		}
		formattedDate := date.Format(localDateFmt)

		result.WriteString(fmt.Sprintf("%10s | %-25s | %13s\n",
			formattedDate, desc,
			currencyFormatter(entry.Change, currencySymbol)))
	}
	
	return result.String(), nil
}

func formatDutchCurrency(cents int, currencySymbol string) string {
	if cents < 0 {
		return currencySymbol + " " + humanReadable(-cents, ".", ",") + "-"
	}
	return currencySymbol + " " + humanReadable(cents, ".", ",") + " "
}

func formatUSCurrency(cents int, currencySymbol string) string {
	if cents < 0 {
		return "(" + currencySymbol + humanReadable(-cents, ",", ".") + ")"
	}
	return currencySymbol + humanReadable(cents, ",", ".") + " "
}

func humanReadable(cents int, separator, decimal string) string {
	dollars := strconv.Itoa(cents / 100)
	if len(dollars) > 3 {
		var result strings.Builder
		result.Grow(len(dollars) + (len(dollars)-1)/3)
		
		start := len(dollars) % 3
		if start == 0 {
			start = 3
		}
		
		result.WriteString(dollars[:start])
		for i := start; i < len(dollars); i += 3 {
			result.WriteString(separator)
			result.WriteString(dollars[i : i+3])
		}
		dollars = result.String()
	}
	
	return dollars + decimal + fmt.Sprintf("%02d", cents%100)
}