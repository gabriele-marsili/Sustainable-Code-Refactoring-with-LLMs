package ledger

import (
	"fmt"
	"sort"
	"strconv"
	"strings"
	"time"
)

//TestVersion is the version of the unit tests that this will pass
const TestVersion = 2

//Entry a line in a ledger
type Entry struct {
	Date        string // "Y-m-d"
	Description string
	Change      int // in cents
}

//byDateDescriptionChange how to sort entries
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
	var currencyFormatter func(int, string, *strings.Builder)
	var header string

	switch locale {
	case "nl-NL":
		localDateFmt = "01-02-2006"
		header = "Datum      | Omschrijving              | Verandering\n"
		currencyFormatter = formatDutchCurrency
	case "en-US":
		localDateFmt = "01/02/2006"
		header = "Date       | Description             | Change\n"
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

		sb.WriteString(dateStr)
		sb.WriteString(" | ")
		sb.WriteString(description)
		sb.WriteString(strings.Repeat(" ", max(0, 25-len(description))))
		sb.WriteString(" | ")

		currencyFormatter(entry.Change, currencySymbol, &sb)
		sb.WriteString("\n")
	}

	return sb.String(), nil
}

func max(a, b int) int {
	if a > b {
		return a
	}
	return b
}

/*formatDutchCurrency formats currency the Dutch way.*/
func formatDutchCurrency(cents int, currencySymbol string, sb *strings.Builder) {
	sb.WriteString(currencySymbol)
	sb.WriteString(" ")
	if cents < 0 {
		humanReadable(-cents, ".", ",", sb)
		sb.WriteString("-")
	} else {
		humanReadable(cents, ".", ",", sb)
		sb.WriteString(" ")
	}
}

/*formatUSCurrency formats currency the US way.*/
func formatUSCurrency(cents int, currencySymbol string, sb *strings.Builder) {
	if cents < 0 {
		sb.WriteString("(")
		sb.WriteString(currencySymbol)
		humanReadable(-cents, ",", ".", sb)
		sb.WriteString(")")
	} else {
		sb.WriteString(currencySymbol)
		humanReadable(cents, ",", ".", sb)
		sb.WriteString(" ")
	}
}

/*humanReadable makes a number with powers seperated.*/
func humanReadable(cents int, seperator, decimal string, sb *strings.Builder) {
	dollars := cents / 100
	cents %= 100

	dollarsStr := strconv.Itoa(dollars)
	lenDollars := len(dollarsStr)

	for i := lenDollars - 3; i > 0; i -= 3 {
		sb.WriteString(dollarsStr[:i])
		sb.WriteString(seperator)
		dollarsStr = dollarsStr[i:]
	}
	sb.WriteString(dollarsStr)
	sb.WriteString(decimal)

	if cents < 10 {
		sb.WriteString("0")
	}
	sb.WriteString(strconv.Itoa(cents))
}