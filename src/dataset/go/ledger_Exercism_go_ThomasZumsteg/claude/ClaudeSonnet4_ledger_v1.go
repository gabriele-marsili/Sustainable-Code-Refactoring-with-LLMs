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
	if len(entries) == 0 {
		return getHeader(locale)
	}

	entriesCopy := make([]Entry, len(entries))
	copy(entriesCopy, entries)

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

	sort.Sort(byDateDescriptionChange(entriesCopy))

	var result strings.Builder
	result.WriteString(header)
	
	dateFmt := "2006-02-01"
	for i := range entriesCopy {
		entry := &entriesCopy[i]
		
		if len(entry.Description) > 25 {
			entry.Description = entry.Description[:22] + "..."
		}

		date, err := time.Parse(dateFmt, entry.Date)
		if err != nil {
			return "", err
		}
		entry.Date = date.Format(localDateFmt)

		result.WriteString(fmt.Sprintf("%10s | %-25s | %13s\n",
			entry.Date, entry.Description,
			currencyFormatter(entry.Change, currencySymbol)))
	}
	return result.String(), nil
}

func getHeader(locale string) (string, error) {
	switch locale {
	case "nl-NL":
		return "Datum      | Omschrijving              | Verandering\n", nil
	case "en-US":
		return "Date       | Description               | Change\n", nil
	default:
		return "", fmt.Errorf("Unknown locale: %s", locale)
	}
}

/*formatDutchCurrency formats currency the Dutch way.*/
func formatDutchCurrency(cents int, currencySymbol string) string {
	if cents < 0 {
		return currencySymbol + " " + humanReadable(-cents, ".", ",") + "-"
	}
	return currencySymbol + " " + humanReadable(cents, ".", ",") + " "
}

/*formatUSCurrency formats currency the US way.*/
func formatUSCurrency(cents int, currencySymbol string) string {
	if cents < 0 {
		return "(" + currencySymbol + humanReadable(-cents, ",", ".") + ")"
	}
	return currencySymbol + humanReadable(cents, ",", ".") + " "
}

/*humanReadable makes a number with powers seperated.*/
func humanReadable(cents int, seperator, decimal string) string {
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
			result.WriteString(seperator)
			result.WriteString(dollars[i : i+3])
		}
		dollars = result.String()
	}
	return dollars + decimal + fmt.Sprintf("%02d", cents%100)
}