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

// Entry a line in a ledger
type Entry struct {
	Date        string // "Y-m-d"
	Description string
	Change      int // in cents
}

// byDateDescriptionChange how to sort entries
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

/*FormatLedger prints a ledger of entries given some localization.*/
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

	var localDateFmt string
	var currencyFormatter func(int, string) string
	var header string
	switch locale {
	case "nl-NL":
		localDateFmt = "01-02-2006"
		header = "Datum       | Omschrijving              | Verandering\n"
		currencyFormatter = formatDutchCurrency
	case "en-US":
		localDateFmt = "01/02/2006"
		header = "Date        | Description             | Change\n"
		currencyFormatter = formatUSCurrency
	default:
		return "", fmt.Errorf("Unknown locale: %s", locale)
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

		sb.WriteString(fmt.Sprintf("%-12s| %-27s | %13s\n",
			dateStr, description,
			currencyFormatter(entry.Change, currencySymbol)))
	}

	return sb.String(), nil
}

/*formatDutchCurrency formats currency the Dutch way.*/
func formatDutchCurrency(cents int, currencySymbol string) string {
	if cents < 0 {
		return fmt.Sprintf("%s %s-", currencySymbol, humanReadable(-cents, ".", ","))
	}
	return fmt.Sprintf("%s %s ", currencySymbol, humanReadable(cents, ".", ","))
}

/*formatUSCurrency formats currency the US way.*/
func formatUSCurrency(cents int, currencySymbol string) string {
	if cents < 0 {
		return fmt.Sprintf("(%s%s)", currencySymbol, humanReadable(-cents, ",", "."))
	}
	return fmt.Sprintf("%s%s ", currencySymbol, humanReadable(cents, ",", "."))
}

/*humanReadable makes a number with powers seperated.*/
func humanReadable(cents int, seperator, decimal string) string {
	s := strconv.Itoa(cents)
	dollars := ""
	if len(s) > 2 {
		dollars = s[:len(s)-2]
		for i := len(dollars) - 3; i > 0; i -= 3 {
			dollars = dollars[:i] + seperator + dollars[i:]
		}
	} else {
		dollars = "0"
	}

	fraction := ""
	if len(s) >= 2 {
		fraction = s[len(s)-2:]
	} else if len(s) == 1 {
		fraction = "0" + s
	} else {
		fraction = "00"
	}

	return dollars + decimal + fraction
}