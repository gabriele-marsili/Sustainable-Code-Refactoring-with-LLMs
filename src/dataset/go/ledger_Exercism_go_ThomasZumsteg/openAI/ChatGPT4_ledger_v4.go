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

func (d byDateDescriptionChange) Len() int           { return len(d) }
func (d byDateDescriptionChange) Swap(i, j int)      { d[i], d[j] = d[j], d[i] }
func (d byDateDescriptionChange) Less(i, j int) bool {
	if d[i].Date != d[j].Date {
		return d[i].Date < d[j].Date
	}
	if d[i].Description != d[j].Description {
		return d[i].Description < d[j].Description
	}
	return d[i].Change < d[j].Change
}

func FormatLedger(currency, locale string, entries []Entry) (string, error) {
	var currencySymbol string
	switch currency {
	case "USD":
		currencySymbol = "$"
	case "EUR":
		currencySymbol = "€"
	default:
		return "", fmt.Errorf("unknown currency: %s", currency)
	}

	var localDateFmt, header string
	var currencyFormatter func(int) string
	switch locale {
	case "nl-NL":
		localDateFmt = "02-01-2006"
		header = "Datum      | Omschrijving           | Verandering\n"
		currencyFormatter = func(cents int) string {
			if cents < 0 {
				return fmt.Sprintf("%s %s-", currencySymbol, humanReadable(-cents, ".", ","))
			}
			return fmt.Sprintf("%s %s ", currencySymbol, humanReadable(cents, ".", ","))
		}
	case "en-US":
		localDateFmt = "01/02/2006"
		header = "Date       | Description            | Change\n"
		currencyFormatter = func(cents int) string {
			if cents < 0 {
				return fmt.Sprintf("(%s%s)", currencySymbol, humanReadable(-cents, ",", "."))
			}
			return fmt.Sprintf("%s%s ", currencySymbol, humanReadable(cents, ",", "."))
		}
	default:
		return "", fmt.Errorf("unknown locale: %s", locale)
	}

	sort.Sort(byDateDescriptionChange(entries))

	var sb strings.Builder
	sb.WriteString(header)

	for _, entry := range entries {
		desc := entry.Description
		if len(desc) > 25 {
			desc = desc[:22] + "..."
		}

		date, err := time.Parse("2006-01-02", entry.Date)
		if err != nil {
			return "", err
		}

		sb.WriteString(fmt.Sprintf("%-10s | %-25s | %13s\n",
			date.Format(localDateFmt), desc, currencyFormatter(entry.Change)))
	}

	return sb.String(), nil
}

func humanReadable(cents int, sep, dec string) string {
	dollars := strconv.Itoa(cents / 100)
	if len(dollars) > 3 {
		var sb strings.Builder
		for i, j := len(dollars)%3, 0; j < len(dollars); j += 3 {
			if i == 0 && j > 0 {
				sb.WriteString(sep)
			} else if i > 0 && j == 0 {
				sb.WriteString(dollars[:i])
				sb.WriteString(sep)
				continue
			}
			sb.WriteString(dollars[j : j+3])
			if j+3 < len(dollars) {
				sb.WriteString(sep)
			}
		}
		dollars = sb.String()
	}
	return fmt.Sprintf("%s%s%02d", dollars, dec, cents%100)
}