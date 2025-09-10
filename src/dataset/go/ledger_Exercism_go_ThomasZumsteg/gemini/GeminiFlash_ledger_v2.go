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
		header = "Date       | Description             | Change\n"
		currencyFormatter = formatUSCurrency
	default:
		return "", fmt.Errorf("unknown locale: %s", locale)
	}

	// Pre-allocate the string builder to avoid multiple allocations.  Estimate a reasonable size.
	sb := strings.Builder{}
	sb.WriteString(header)

	dateFmt := "2006-01-02"
	sort.Sort(byDateDescriptionChange(entries))

	for _, entry := range entries {
		description := entry.Description
		if len(description) > 25 {
			description = description[:22] + "..."
		}

		t, err := time.Parse(dateFmt, entry.Date)
		if err != nil {
			return "", err
		}
		date := t.Format(localDateFmt)

		sb.WriteString(fmt.Sprintf("%-11s| %-26s| %13s\n", date, description, currencyFormatter(entry.Change, currencySymbol)))
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
func humanReadable(cents int, separator, decimal string) string {
	dollars := cents / 100
	cents %= 100

	dollarStr := strconv.Itoa(dollars)
	n := len(dollarStr)

	if n > 3 {
		var buf strings.Builder
		buf.Grow(n + (n-1)/3) // Pre-allocate buffer
		for i := 0; i < n; i++ {
			if i > 0 && (n-i)%3 == 0 {
				buf.WriteString(separator)
			}
			buf.WriteByte(dollarStr[i])
		}
		dollarStr = buf.String()
	}

	return fmt.Sprintf("%s%s%02d", dollarStr, decimal, cents)
}