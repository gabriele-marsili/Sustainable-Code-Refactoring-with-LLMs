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

var (
	dateFmt = "2006-02-01"
	headerFmt = "%-10s | %-25s | %s\n"
	
	currencySymbols = map[string]string{
		"USD": "$",
		"EUR": "€",
	}
	
	localeConfigs = map[string]struct {
		dateFormat string
		header     string
		formatter  func(int, string) string
	}{
		"nl-NL": {"01-02-2006", "Datum", formatDutchCurrency},
		"en-US": {"02/01/2006", "Date", formatUSCurrency},
	}
)

/*FormatLedger prints a ledger of entries given some localization.*/
func FormatLedger(currency string, locale string, entries []Entry) (string, error) {
	currencySymbol, ok := currencySymbols[currency]
	if !ok {
		return "", fmt.Errorf("Unknown currency: %s", currency)
	}

	config, ok := localeConfigs[locale]
	if !ok {
		return "", fmt.Errorf("Unknown locale: %s", locale)
	}

	if len(entries) == 0 {
		return fmt.Sprintf(headerFmt, config.header, "Description", "Change"), nil
	}

	entriesCopy := make([]Entry, len(entries))
	copy(entriesCopy, entries)
	sort.Sort(byDateDescriptionChange(entriesCopy))

	var builder strings.Builder
	builder.Grow(len(entries)*60 + 50)
	
	if locale == "nl-NL" {
		builder.WriteString(fmt.Sprintf(headerFmt, "Datum", "Omschrijving", "Verandering"))
	} else {
		builder.WriteString(fmt.Sprintf(headerFmt, "Date", "Description", "Change"))
	}

	for i := range entriesCopy {
		entry := &entriesCopy[i]
		
		if len(entry.Description) > 25 {
			entry.Description = entry.Description[:22] + "..."
		}

		date, err := time.Parse(dateFmt, entry.Date)
		if err != nil {
			return "", err
		}
		
		formattedDate := date.Format(config.dateFormat)
		formattedCurrency := config.formatter(entry.Change, currencySymbol)
		
		builder.WriteString(fmt.Sprintf("%10s | %-25s | %13s\n",
			formattedDate, entry.Description, formattedCurrency))
	}
	
	return builder.String(), nil
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
func humanReadable(cents int, separator, decimal string) string {
	dollars := strconv.Itoa(cents / 100)
	
	if len(dollars) > 3 {
		var builder strings.Builder
		builder.Grow(len(dollars) + (len(dollars)-1)/3 + 3)
		
		start := len(dollars) % 3
		if start == 0 {
			start = 3
		}
		
		builder.WriteString(dollars[:start])
		for i := start; i < len(dollars); i += 3 {
			builder.WriteString(separator)
			builder.WriteString(dollars[i : i+3])
		}
		dollars = builder.String()
	}
	
	return dollars + decimal + fmt.Sprintf("%02d", cents%100)
}